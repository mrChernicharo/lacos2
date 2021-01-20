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

  reportDate: any;
  currentConasultas$: any;

  constructor(private fb: FormBuilder) {}

  get consultas() {
    return this.editForm.get('consultas') as FormArray;
  }

  ngOnInit(): void {
    this.createEditForm();
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
      );
    }
  }

  createEditForm() {
    return (this.editForm = this.fb.group({
      dataRelatorio: new FormControl(
        ''
        // this.reportDate.toLocaleDateString('pt-BR')
      ),
      consultas: this.fb.array([]),
    }));
  }
}
