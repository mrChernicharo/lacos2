import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-clientes',
  templateUrl: './add-clientes.component.html',
  styleUrls: ['./add-clientes.component.scss'],
})
export class AddClientesComponent implements OnInit {
  origens = ['clínica', 'flamengo', 'vale', 'cpII'];
  clienteForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      telefone: new FormControl('', [
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(13),
      ]),
      origem: new FormControl('clínica', Validators.required),
    });
  }

  saveCliente() {
    console.log(this.clienteForm.value);
  }
}
