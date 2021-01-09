import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private clientesSubject$ = new BehaviorSubject<Cliente[]>([]);
  public clientes$ = this.clientesSubject$.asObservable();

  constructor(private db: DbService) {}

  addCliente(
    formData: Omit<Cliente, 'dataCadastro' | 'atualizadoEm' | 'atendimentos'>
  ) {
    const cliente = Object.assign(formData, {
      dataCadastro: new Date(),
      atualizadoEm: new Date(),
      atendimentos: 0,
    });

    console.log(cliente as Cliente);
    this.db.createCliente(cliente);
  }

  getAllClientes() {
    return this.db.fetchAllClientes();
  }
}
