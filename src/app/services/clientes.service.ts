import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Cliente } from '../models/cliente.model';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private clientesSubject$ = new BehaviorSubject<Cliente[]>([]);
  public _clientes$ = this.clientesSubject$.asObservable();
  // _clientes$: Observable<Cliente[]>;

  constructor(private db: DbService) {
    this._clientes$ = this.db.fetchAllClientes().pipe(
      tap((data) => {
        console.log(data);
        this.clientesSubject$.next(data);
      })
    );
  }

  addCliente(
    formData: Omit<Cliente, 'dataCadastro' | 'atualizadoEm' | 'atendimentos'>
  ) {
    const cliente = Object.assign(formData, {
      dataCadastro: new Date(),
      atualizadoEm: new Date(),
      atendimentos: 0,
    });

    // console.log(cliente as Cliente);
    this.db.createCliente(cliente);
    this.clientesSubject$.next([...this.clientesSubject$.getValue(), cliente]);
  }

  // getAllClientes() {
  // this._clientes$
  // }
}
