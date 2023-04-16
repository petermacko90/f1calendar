import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CalendarData, Race, ResponseData } from './types';

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

  private getDate(date: string, time?: string) {
    return time ? new Date(`${date}T${time}`) : new Date(date);
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

    const dataSource = calendar.map((race) => ({
      round: `${race.round}.`,
      location: `${race.Circuit.Location.country}, ${race.Circuit.Location.locality}`,
      date: this.getDate(race.date, race.time).toLocaleDateString([], {
        day: 'numeric',
        month: 'numeric',
      }),
      time: race.time
        ? this.getDate(race.date, race.time).toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
          })
        : 'N/A',
      isNext: race.round === nextRace,
    }));

    return {
      dataSource,
      season: calendar.at(0)?.season ?? '',
    };
  }
}
