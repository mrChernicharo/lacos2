import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { defer, from, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente.model';
import { Consulta } from 'src/app/models/consulta.model';
import {
  ConsultasService,
  HORARIOS,
  MODALIDADES,
} from 'src/app/services/consultas.service';

const dateFormatOptions = {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
};

@Component({
  selector: 'app-edit-relatorio',
  templateUrl: './edit-relatorio.component.html',
  styleUrls: ['./edit-relatorio.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditRelatorioComponent implements OnInit, OnChanges {
  @Input() reportConsultas: Consulta[];
  @Input() userClientes: Cliente[];

  editForm: FormGroup;
  modalidades: string[];
  horarios: string[];
  reportDate: string;
  currentConasultas$: any;

  constructor(
    private fb: FormBuilder,
    private consultasService: ConsultasService
  ) {}

  get consultaRows() {
    return this.editForm?.get('consultas') as FormArray;
  }

  ngOnInit(): void {
    this.horarios = HORARIOS;
    this.modalidades = MODALIDADES;
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);

    if (changes.reportConsultas) {
      this.reportDate = new Date(
        this.reportConsultas[0].dataConsulta['seconds']
      ).toLocaleDateString('pt-BR', dateFormatOptions);

      // se clicou na mesma data, destrua, senão crie o novo editForm
      if (
        JSON.stringify(changes.reportConsultas.previousValue) ===
        JSON.stringify(changes.reportConsultas.currentValue)
      ) {
        this.destroyEditForm();
        changes.reportConsultas.currentValue = null;
      } else {
        this.createEditForm();
        this.fillEditForm();
      }
    }
  }

  createEditForm() {
    return (this.editForm = this.fb.group({
      dataRelatorio: new FormControl(this.reportDate),
      consultas: this.fb.array([]),
    }));
  }

  destroyEditForm() {
    return (this.editForm = undefined);
  }

  fillEditForm() {
    this.reportConsultas.forEach((consulta) => {
      const consultaRow = this.newConultaForm(consulta);
      this.consultaRows.push(consultaRow);
    });
  }

  newConultaForm(consulta?: Consulta) {
    return this.fb.group({
      nomePaciente: new FormControl(
        consulta?.nomePaciente || '',
        Validators.required
      ),
      modalidade: new FormControl(
        consulta?.modalidade || '',
        Validators.required
      ),
      horario: new FormControl(consulta?.horario || '', [
        Validators.required,
        RxwebValidators.unique(),
      ]),
      // idPaciente: new FormControl(''),
      // origem: new FormControl(''),
    });
  }

  getConsultasControls() {
    if (this.consultaRows) {
      return this.consultaRows.controls;
    }
  }

  addConsultaFormGroup() {
    this.consultaRows.push(this.newConultaForm());
    // this.destroyEditForm();
  }

  removeConsultaFormGroup(i) {
    this.consultaRows.removeAt(i);
  }

  saveReportChanges() {
    console.log('save report changes!');
  }

  deleteReport() {
    console.log('delete report!');
  }
}
