import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-add-clientes',
  templateUrl: './add-clientes.component.html',
  styleUrls: ['./add-clientes.component.scss'],
})
export class AddClientesComponent implements OnInit {
  origens = ['clínica', 'flamengo', 'vale', 'cpII'];
  clienteForm: FormGroup;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      telefone: new FormControl('', [
        Validators.pattern('^[0-9 | + | -]*$'),
        Validators.maxLength(16),
        Validators.minLength(8),
        Validators.required,
      ]),
      email: new FormControl('', Validators.email),
      endereco: new FormControl(''),
      origem: new FormControl('clínica', Validators.required),
    });
  }

  getFieldStatus(field: string): string {
    return !this.clienteForm.get(field).dirty
      ? 'basic'
      : this.clienteForm.get(field).invalid
      ? 'danger'
      : 'success';
  }

  saveCliente() {
    this.clientesService.addCliente(this.clienteForm.value as Partial<Cliente>);
  }
}
