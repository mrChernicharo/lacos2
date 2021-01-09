import { Component, Inject, OnInit } from '@angular/core';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { ReportFormComponent } from './report-form/report-form.component';

@Component({
  selector: 'app-novo-relatorio',
  templateUrl: './novo-relatorio.component.html',
  styleUrls: ['./novo-relatorio.component.scss'],
  // providers: [CalendarFormComponent, ReportFormComponent],
})
export class NovoRelatorioComponent implements OnInit {
  calendarForm;
  reportForm;

  constructor() {} // @Inject('reportForm') public reportForm: ReportFormComponent // @Inject('calendarForm') public calendarForm: CalendarFormComponent,

  ngOnInit(): void {}
}
