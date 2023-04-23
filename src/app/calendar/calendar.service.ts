import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CalendarData, DataSourceItem, Race, ResponseData } from './types';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private http: HttpClient) {}

  getCalendarData(): Observable<CalendarData> {
    return this.http
      .get<ResponseData>('https://ergast.com/api/f1/current.json')
      .pipe(
        map((data) => this.convertCalendarData(data.MRData.RaceTable.Races))
      );
  }

  private getDate(date: string, time?: string): Date {
    return time ? new Date(`${date}T${time}`) : new Date(date);
  }

  private formatDate(date: string, time?: string): string {
    return this.getDate(date, time).toLocaleDateString([], {
      day: 'numeric',
      month: 'numeric',
    });
  }

  private formatTime(date: string, time?: string): string {
    return this.getDate(date, time).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  private getNextRace(races: Race[]): string {
    for (let i = 0, l = races.length, d = new Date(); i < l; i++) {
      if (d < this.getDate(races[i].date, races[i].time)) {
        return races[i].round;
      }
    }
    return '';
  }

  private convertCalendarData(calendar: Race[]): CalendarData {
    const nextRace = this.getNextRace(calendar);

    const dataSource: DataSourceItem[] = calendar.map((race) => ({
      round: `${race.round}.`,
      location: `${race.Circuit.Location.country}, ${race.Circuit.Location.locality}`,
      date: this.formatDate(race.date, race.time),
      time: race.time ? this.formatTime(race.date, race.time) : 'N/A',
      qualificationDate: this.formatDate(
        race.Qualifying.date,
        race.Qualifying.time
      ),
      qualificationTime: this.formatTime(
        race.Qualifying.date,
        race.Qualifying.time
      ),
      isNext: race.round === nextRace,
    }));

    return {
      dataSource,
      season: calendar.at(0)?.season ?? '',
    };
  }
}
