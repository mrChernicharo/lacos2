import {
  Component,
  Inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NbNativeDateService } from '@nebular/theme';
import {
  ConsultasService,
  HORARIOS,
  MODALIDADES,
} from 'src/app/services/consultas.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { Cliente } from 'src/app/models/cliente.model';
import { Consulta } from 'src/app/models/consulta.model';
import {
  IReportForm,
  IReportFormConsulta,
} from 'src/app/services/consultas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-novo-relatorio',
  templateUrl: './novo-relatorio.component.html',
  styleUrls: ['./novo-relatorio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NbNativeDateService],
})
export class NovoRelatorioComponent implements OnInit {
  // date = new Date();
  date: Date = null;
  calendarForm: FormGroup;
  reportForm: FormGroup;
  consultaForm: FormGroup;
  revisionTable: any;

  clientes: Cliente[];
  horarios = HORARIOS;
  modalidades = MODALIDADES;
  finalFormData: IReportForm;
  routerData$: any;
  modalidadesCountObj: Object;

  // @ViewChild('nomeField')

  constructor(
    private fb: FormBuilder,
    private r: Renderer2,
    private router: Router,
    private consultaService: ConsultasService,
    private route: ActivatedRoute
  ) {} // @Inject('reportForm') public reportForm: ReportFormComponent // @Inject('calendarForm') public calendarForm: CalendarFormComponent,

  get consultas() {
    return this.reportForm.get('consultas') as FormArray;
  }

  ngOnInit(): void {
    this.calendarForm = new FormGroup({
      date: new FormControl('', Validators.required),
    });
    console.log(this.clientes);

    this.route.data.pipe(
      tap((routeData) => {
        this.clientes = routeData['clientes'] as Cliente[];
      })
    );
    // console.log(this.router.routerState.snapshot);

    this.createReportForm();
    this.addConsulta();
  }

  handleFormData(event) {
    this.finalFormData = this.reportForm.value as IReportForm;
    this.consultas.controls.forEach((consulta, i) => {
      console.log(consulta);
      const origemConsulta = (consulta.get('nomePaciente').value as string)
        .split(' ')
        .pop();
      this.finalFormData.consultas[i].origem = origemConsulta;

      let actualName = consulta.get('nomePaciente').value.split(' ');
      actualName.pop();
      this.finalFormData.consultas[i].nomePaciente = actualName.join(' ');
    });

    this.finalFormData.consultas.sort(
      (a, b) => +a.horario.replace(':', '') - +b.horario.replace(':', '')
    );
    console.log(this.finalFormData);
    this.modalidadesCountObj = this.filterModalidades(
      this.finalFormData.consultas
    );
  }

  createReportForm() {
    return (this.reportForm = this.fb.group({
      // nomeProfissional: new FormControl(''),
      // idProfissional: new FormControl(''),
      dataRelatorio: new FormControl(''),
      dataCriacao: new FormControl(new Date()),
      dataAtualizacao: new FormControl(new Date()),
      consultas: this.fb.array([]),
    }));
  }

  newConultaForm() {
    return this.fb.group({
      nomePaciente: new FormControl('', Validators.required),
      // idPaciente: new FormControl(''),
      origem: new FormControl(''),
      modalidade: new FormControl('', Validators.required),
      horario: new FormControl('', [
        Validators.required,
        RxwebValidators.unique(),
      ]),
    });
  }

  handleCalendarDateChanges(date: Date) {
    this.date = date;
    this.calendarForm.get('date').setValue(date);
    this.reportForm.get('dataRelatorio').setValue(date);
  }

  getConsultasControls() {
    return this.consultas.controls;
  }

  addConsulta() {
    this.consultas.push(this.newConultaForm());
  }
  removeConsulta(i) {
    console.log('remove ' + i);
    // if (this.consultas.length > 1) {
    this.consultas.removeAt(i);
    // }
  }
  trimPacienteName(event: string, i: number) {
    // console.log(event);
    const selectElChild = document.querySelector(`#nomePaciente-${i}`)
      .firstElementChild as HTMLButtonElement;
    let arrText = event.split(' ');
    arrText.pop();
    let ftext = arrText.join(' ');
    selectElChild.textContent = ftext;
  }

  filterModalidades(consultas: IReportFormConsulta[]) {
    let obj = new Object();

    consultas.forEach((consulta, i) => {
      if (!obj.hasOwnProperty(consulta.modalidade)) {
        obj[consulta.modalidade] = 0;
      }
      obj[consulta.modalidade] += 1;
    });
    console.log(obj);
    return obj;
  }
  submitReport() {
    console.log('submit!');
    console.log(this.finalFormData);
    this.consultaService.saveConsultas(this.finalFormData);
  }
}
