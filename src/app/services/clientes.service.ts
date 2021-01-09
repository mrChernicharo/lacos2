import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor() {}

  addCliente(formData: Partial<Cliente>) {
    console.log(formData);

    const cliente = Object.assign(formData, {
      dataCadastro: new Date(),
      atualizadoEm: new Date(),
      atendimentos: 0,
    });

    console.log(cliente as Cliente);
  }
}
