import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private db: DbService) {}

  addCliente(
    formData: Omit<Cliente, 'dataCadastro' | 'atualizadoEm' | 'atendimentos'>
  ) {
    console.log(formData);

    const cliente = Object.assign(formData, {
      dataCadastro: new Date(),
      atualizadoEm: new Date(),
      atendimentos: 0,
    });

    console.log(cliente as Cliente);
    this.db.createCliente(cliente);
  }
}
