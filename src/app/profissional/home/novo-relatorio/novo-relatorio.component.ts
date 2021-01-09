import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbNativeDateService } from '@nebular/theme';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { ReportFormComponent } from './report-form/report-form.component';

@Component({
  selector: 'app-novo-relatorio',
  templateUrl: './novo-relatorio.component.html',
  styleUrls: ['./novo-relatorio.component.scss'],
  providers: [NbNativeDateService],
})
export class NovoRelatorioComponent implements OnInit {
  // date = new Date();
  date = null;
  calendarForm: FormGroup;
  reportForm;

  constructor() {} // @Inject('reportForm') public reportForm: ReportFormComponent // @Inject('calendarForm') public calendarForm: CalendarFormComponent,

  ngOnInit(): void {
    this.calendarForm = new FormGroup({
      date: new FormControl('', Validators.required),
    });

    this.reportForm = new FormArray([]);
  }
}
