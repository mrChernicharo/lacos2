import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NbNativeDateService } from '@nebular/theme';
import { HORARIOS, MODALIDADES } from 'src/app/services/consultas.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

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
  date: Date = null;
  calendarForm: FormGroup;
  reportForm: FormGroup;
  consultaForm: FormGroup;
  horarios = HORARIOS;
  modalidades = MODALIDADES;

  constructor(private fb: FormBuilder) {} // @Inject('reportForm') public reportForm: ReportFormComponent // @Inject('calendarForm') public calendarForm: CalendarFormComponent,

  get consultas() {
    return this.reportForm.get('consultas') as FormArray;
  }

  ngOnInit(): void {
    this.calendarForm = new FormGroup({
      date: new FormControl('', Validators.required),
    });

    this.createReportForm();
    this.addConsulta();
  }

  handleDateChange(date: Date) {
    this.date = date;
    this.calendarForm.get('date').setValue(date);
  }

  createReportForm() {
    return (this.reportForm = this.fb.group({
      nomeProfissional: new FormControl(''),
      idProfissional: new FormControl(''),
      dataRelatorio: new FormControl(''),
      dataCriacao: new FormControl(new Date()),
      dataAtualizacao: new FormControl(new Date()),
      consultas: this.fb.array([]),
    }));
  }

  newConultaForm() {
    return this.fb.group({
      nomePaciente: new FormControl(
        ''
        // Validators.required
      ),
      idPaciente: new FormControl(''),
      modalidade: new FormControl('', Validators.required),
      horario: new FormControl('', [
        Validators.required,
        RxwebValidators.unique(),
      ]),
    });
  }

  getConsultasControls() {
    return this.consultas.controls;
  }

  addConsulta() {
    this.consultas.push(this.newConultaForm());
  }
  removeConsulta(i) {
    console.log('remove ' + i);
    if (this.consultas.length > 1) {
      this.consultas.removeAt(i);
    }
  }
}
