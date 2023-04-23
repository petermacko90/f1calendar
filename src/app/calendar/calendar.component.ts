import { Component } from '@angular/core';
import { Columns, DataSourceItem } from './types';
import { CalendarService } from './calendar.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CalendarComponent {
  columns = Columns;
  displayedColumns = [
    Columns.round,
    Columns.location,
    Columns.date,
    Columns.time,
  ];
  displayedColumnsWithExpand = [...this.displayedColumns, Columns.expand];
  expandedRace: DataSourceItem | null = null;

  calendarData$ = this.calendarService.getCalendarData();

  constructor(private calendarService: CalendarService) {}

  toggleRow(selectedRace: DataSourceItem) {
    this.expandedRace =
      selectedRace === this.expandedRace ? null : selectedRace;
  }
}
