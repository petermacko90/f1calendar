import { Component } from '@angular/core';
import { Columns } from './types';
import { CalendarService } from './calendar.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  columns = Columns;
  displayedColumns = [
    Columns.round,
    Columns.location,
    Columns.date,
    Columns.time,
  ];

  calendarData$ = this.calendarService.getCalendarData();

  constructor(private calendarService: CalendarService) {}
}
