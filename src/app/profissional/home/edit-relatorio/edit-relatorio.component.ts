import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { AppUser } from 'src/app/services/auth.service';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRelatorioComponent implements OnInit, OnChanges {
  @Input() reportConsultas: Consulta[];
  @Input() userClientes: Cliente[];
  @Input() user: AppUser;

  editForm: FormGroup;
  modalidades: string[];
  horarios: string[];
  reportDate: string;
  reportRawDate: Date;
  // currentConasultas$: any;
  removedConsultasIds: string[];

  constructor(
    private fb: FormBuilder,
    private consultasService: ConsultasService,
    private cd: ChangeDetectorRef
  ) {}

  get consultaRows() {
    return this.editForm?.get('consultas') as FormArray;
  }

  ngOnInit(): void {
    this.horarios = HORARIOS;
    this.modalidades = MODALIDADES;
    this.removedConsultasIds = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);

    if (changes.reportConsultas) {
      this.reportRawDate = new Date(
        this.reportConsultas[0].dataConsulta['seconds']
      );
      this.reportDate = this.reportRawDate.toLocaleDateString(
        'pt-BR',
        dateFormatOptions
      );

      // se clicou na mesma data, destrua, senão crie o novo editForm
      if (
        JSON.stringify(changes.reportConsultas.previousValue) ===
        JSON.stringify(changes.reportConsultas.currentValue)
      ) {
        this.destroyEditForm();
        changes.reportConsultas.currentValue = null;
      } else {
        this.destroyEditForm();

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
    this.removedConsultasIds = [];

    return (this.editForm = undefined);
  }

  fillEditForm() {
    this.reportConsultas.forEach((consulta) => {
      const consultaRow = this.newConultaForm(consulta);
      this.consultaRows.push(consultaRow);
    });
  }

  newConultaForm(consulta?: Consulta) {
    const fg = this.fb.group({
      idConsulta: new FormControl(consulta?.idConsulta),
      idPaciente: new FormControl(consulta?.idPaciente),
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
      dataConsulta: new FormControl(''),
      dataCriacao: new FormControl(consulta?.dataCriacao || new Date()),
      dataAtualizacao: new FormControl(new Date()),
      origem: new FormControl(consulta?.origem),
      idProfissional: new FormControl(consulta?.idProfissional || this.user.id),
      nomeProfissional: new FormControl(
        consulta?.nomeProfissional || this.user.nome
      ),
    });

    return fg;
  }

  getConsultasControls() {
    if (this.consultaRows) {
      return this.consultaRows.controls;
    }
  }

  getPacienteInfo(nomePaciente) {
    // this.userClientes.filter(cliente => cliente.nome === nomePaciente);
  }

  addConsultaFormGroup() {
    this.consultaRows.push(this.newConultaForm());
    // this.destroyEditForm();
  }

  removeConsultaFormGroup(i) {
    const consultaId = this.getConsultasControls()[i].get('idConsulta').value;
    if (!!consultaId) {
      this.removedConsultasIds.push(consultaId);
    }
    console.log(this.removedConsultasIds);
    this.consultaRows.removeAt(i);
  }

  // setPacienteData(event: string, i: number) {
  //   const selectElChild = document.querySelector(`#nomePaciente-${i}`)
  //     .firstElementChild as HTMLButtonElement;
  //   console.log(event);
  // console.log(selectElChild);
  // console.log(selectElChild.textContent);
  // console.log(selectElChild.innerText);
  // let arrText = event.split(' ');
  // console.log(arrText);
  //   arrText.pop();
  //   arrText.pop();
  //   let ftext = arrText.join(' ');
  //   selectElChild.textContent = ftext;
  // }

  findClienteData(id, i) {
    // console.log(id);
    const targetCliente = this.userClientes.find(
      (cliente) => cliente.id === id
    );
    // console.log(targetCliente);
    // console.log(this.getConsultasControls());
    this.getConsultasControls()[i].get('idPaciente').setValue(targetCliente.id);
    this.getConsultasControls()[i].get('origem').setValue(targetCliente.origem);
    // this.getConsultasControls()[i].get('idPaciente').setValue(targetCliente.id)
    // console.log(this.consultaRows);
    // console.log(this.consultaRows[i]);
  }

  trimInput(i) {
    const selectElChild = document.querySelector(`#nomePaciente-${i}`)
      .firstElementChild as HTMLButtonElement;

    // console.log(selectElChild);
    console.log(selectElChild.textContent);
    // console.log(selectElChild.innerText);
    let arrText = selectElChild.textContent.split(' ');
    // console.log(arrText);
    arrText.pop();
    arrText.pop();
    let ftext = arrText.join(' ');
    selectElChild.textContent = ftext;
  }

  saveReportChanges() {
    console.log(this.reportRawDate);
    if (this.editForm.invalid) {
      console.log('form inválido');
      return;
    }

    for (let consulta of this.getConsultasControls()) {
      // console.log(consulta.get('dataConsulta').value);
      if (!consulta.get('dataConsulta').value) {
        consulta.get('dataConsulta').patchValue({
          seconds: new Date(
            this.reportRawDate.getFullYear(),
            this.reportRawDate.getMonth(),
            this.reportRawDate.getDate(),
            consulta.get('horario').value.substr(0, 2),
            consulta.get('horario').value.substr(3, 2),
            0
          ).getTime(),
          nanoseconds: 0,
        });
      }
      // console.log(consulta.get('dataConsulta').value);
    }
    console.log('save report changes!');
    console.log(this.editForm.value.consultas);
    //

    this.consultasService
      .updateConsultas(this.editForm.value.consultas, this.removedConsultasIds)
      .then((res) => {
        console.log(res);
        // this.cd.markForCheck();
      });
  }

  deleteReport() {
    console.log('delete report!');
    console.log(this.editForm.value);
  }
}
