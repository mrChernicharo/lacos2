import {
  ChangeDetectionStrategy,
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

import { Cliente } from 'src/app/models/cliente.model';
import { Consulta } from 'src/app/models/consulta.model';

import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AppUser } from 'src/app/services/auth.service';
import { HeaderService } from 'src/app/services/header.service';

export type IReportFormConsulta = Pick<
  Consulta,
  'idPaciente' | 'horario' | 'modalidade' | 'origem' | 'nomePaciente'
>;

export interface IReportForm {
  consultas: IReportFormConsulta[];
  dataRelatorio: Date;
  dataAtualizacao: Date;
  dataCriacao: Date;
}

interface ModalidadeCountObj {
  online: number;
  presencial: number;
  externa: number;
}

@Component({
  selector: 'app-novo-relatorio',
  templateUrl: './novo-relatorio.component.html',
  styleUrls: ['./novo-relatorio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NbNativeDateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoRelatorioComponent implements OnInit {
  // date = new Date();
  date: Date = null;
  calendarForm: FormGroup;
  reportForm: FormGroup;
  consultaForm: FormGroup;
  revisionTable: any;
  dateFilter = date => this.setDateFilter(date);

  @Input() clientes: Cliente[];
  @Input() user: AppUser;
  @Input() userConsultas: Consulta[];

  horarios = HORARIOS;
  modalidades = MODALIDADES;
  finalFormData: IReportForm;
  // routerData$: any;
  modalidadesCountObj: Object;

  // @ViewChild('nomeField')

  constructor(
    private fb: FormBuilder,
    private r: Renderer2,
    private router: Router,
    private headerService: HeaderService,
    public renderer: Renderer2,

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

    this.createReportForm();
    this.addConsultaFormGroup();
  }

  handleFormData(event) {
    this.finalFormData = this.reportForm.value as IReportForm;
    //
    this.consultas.controls.forEach((consulta, i) => {
      // console.log(consulta);
      const pacienteInfo = (consulta.get('nomePaciente').value as string).split(' ');
      // console.log(pacienteInfo);

      const idPaciente = pacienteInfo.pop();
      const origemConsulta = pacienteInfo.pop();

      this.finalFormData.consultas[i].idPaciente = idPaciente;
      this.finalFormData.consultas[i].origem = origemConsulta;
      this.finalFormData.consultas[i].nomePaciente = pacienteInfo.join(' ');
    });

    this.finalFormData.consultas.sort(
      (a, b) => +a.horario.replace(':', '') - +b.horario.replace(':', '')
    );
    // console.log(this.finalFormData);
    this.modalidadesCountObj = this.filterModalidades(this.finalFormData.consultas);
  }

  handleCalendarDateChanges(date: Date) {
    this.date = date;

    this.calendarForm.get('date').setValue(date);
    this.reportForm.get('dataRelatorio').setValue(date);

    const el = window.document.querySelector(`#${date.getDate()}-${date.getMonth() + 1}`);
    this.renderer.addClass(el, 'selected');
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
      idPaciente: new FormControl(''),
      origem: new FormControl(''),
      modalidade: new FormControl('', Validators.required),
      horario: new FormControl('', [Validators.required, RxwebValidators.unique()]),
    });
  }

  getConsultasControls() {
    return this.consultas.controls;
  }

  addConsultaFormGroup() {
    this.consultas.push(this.newConultaForm());
  }
  removeConsultaFormGroup(i) {
    this.consultas.removeAt(i);
  }

  trimPacienteName(event: string, i: number) {
    // console.log(event);
    const selectElChild = document.querySelector(`#nomePaciente-${i}`)
      .firstElementChild as HTMLButtonElement;
    let arrText = event.split(' ');
    arrText.pop();
    arrText.pop();
    let ftext = arrText.join(' ');
    selectElChild.textContent = ftext;
  }

  filterModalidades(consultas: IReportFormConsulta[]): ModalidadeCountObj {
    console.log(consultas);
    return consultas.reduce(
      (acc, consulta) => {
        acc[consulta.modalidade] += 1;
        return acc;
      },
      { online: 0, presencial: 0, externa: 0 } as ModalidadeCountObj
    );
  }

  submitReport() {
    console.log('submit!');
    console.log(this.finalFormData);
    console.log(this.user);
    this.consultaService.saveConsultas(this.finalFormData, this.user);
    this.router.navigate(['profissional']);
  }

  setDateFilter(date: Date) {
    if (date.getDay() === 0) {
      // domingo?
      return false;
    }

    if (date.getTime() > new Date().getTime()) {
      // futuro?
      return false;
    } else {
      //
      return this.isWithinLimits(date) && !this.consultaService.isBusyDay(date);
    }
  }

  isWithinLimits(date: Date) {
    const y = new Date().getFullYear();
    const m = new Date().getMonth();
    const d = new Date().getDate();
    const today = new Date(y, m, d, 0, 0, 0);

    // console.log(date);
    // console.log(today.getTime() - date.getTime());
    //
    const diff = () => today.getTime() - date.getTime();
    // 24h == 86.400.000ms
    switch (date.getDay()) {
      case 0: // dom -> 6 dias pra trás
        return diff() <= 86_400_000 * 6 && diff() > 0;

      case 1: // seg -> 7 dias pra trás
        return diff() <= 86_400_000 * 7 && diff() > 0;

      case 2: // ter -> 8 dias pra trás
        return diff() <= 86_400_000 * 8 && diff() > 0;

      case 3: // qua -> 9 dias pra trás
        return diff() <= 86_400_000 * 9 && diff() > 0;

      case 4: // qui -> 3 dias pra trás
        return diff() <= 86_400_000 * 3 && diff() > 0;

      case 5: // sex -> 4 dias pra trás
        return diff() <= 86_400_000 * 4 && diff() > 0;

      case 6: // sab -> 5 dias pra trás
        return diff() <= 86_400_000 * 5 && diff() > 0;
    }

    return true;
  }
}
