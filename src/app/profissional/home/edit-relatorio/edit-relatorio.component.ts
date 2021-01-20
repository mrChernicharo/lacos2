import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
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
import { Consulta } from 'src/app/models/consulta.model';

@Component({
  selector: 'app-edit-relatorio',
  templateUrl: './edit-relatorio.component.html',
  styleUrls: ['./edit-relatorio.component.scss'],
})
export class EditRelatorioComponent implements OnInit, OnChanges {
  @Input() reportConsultas: Consulta[];
  editForm: FormGroup;

  reportDate: string;
  currentConasultas$: any;

  constructor(private fb: FormBuilder) {}

  get consultaRows() {
    return this.editForm.get('consultas') as FormArray;
  }

  ngOnInit(): void {
    // this.createEditForm();
    // this.newConultaForm();
    // this.reportDate = new Date(this.reportConsultas[0].dataConsulta['seconds']);
    // console.log(this.reportConsultas);
  }
  // ngAfterViewInit() {
  //   this.currentConasultas$ = of(this.reportConsultas)
  //     .pipe(tap((v) => console.log(v)))
  //     .subscribe();
  // }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    if (changes.reportConsultas) {
      // console.log(this.reportConsultas);
      this.reportDate = new Date(
        this.reportConsultas[0].dataConsulta['seconds']
      ).toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

      this.createEditForm();
      // this.newConultaForm();
      this.fillEditForm();
    }
  }

  createEditForm() {
    return (this.editForm = this.fb.group({
      dataRelatorio: new FormControl(
        this.reportDate
        // this.reportDate.toLocaleDateString('pt-BR')
      ),
      consultas: this.fb.array([]),
    }));
  }

  fillEditForm() {
    this.reportConsultas.forEach((consulta) => {
      const consultaRow = this.newConultaForm(consulta);
      this.consultaRows.push(consultaRow);
    });

    console.log(this.editForm);
  }

  newConultaForm(consulta: Consulta) {
    return this.fb.group({
      nomePaciente: new FormControl(consulta.nomePaciente, Validators.required),
      // idPaciente: new FormControl(''),
      // origem: new FormControl(''),
      modalidade: new FormControl(consulta.modalidade, Validators.required),
      horario: new FormControl(consulta.horario, [
        Validators.required,
        RxwebValidators.unique(),
      ]),
    });
  }
}
