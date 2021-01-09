import { Component, Inject, OnInit } from '@angular/core';
import { NbDateAdapterService, NbDatepickerAdapter } from '@nebular/theme';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss'],
})
export class CalendarFormComponent implements OnInit {
  date = new Date();

  constructor() {} // @Inject('dateAdapter') private dateAdapter: NbDatepickerAdapter<Date>

  ngOnInit(): void {}

  handleDateChange(event) {
    console.log(event);
  }
}
