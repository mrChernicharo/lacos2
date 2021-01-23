import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { Cliente } from '../models/cliente.model';
import { Consulta } from '../models/consulta.model';
import { AppUser } from './auth.service';
import { ConsultasService } from './consultas.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private clientesSubject$ = new BehaviorSubject<Cliente[]>([]);
  public _clientes$ = this.clientesSubject$.asObservable();

  constructor(private db: DbService, private consultasService: ConsultasService) {}

  fetchAllClientes() {
    return this.db
      .fetchAllClientes()
      .pipe(
        tap(data => {
          // console.log(data);
          this.clientesSubject$.next(data);
        })
      )
      .subscribe();
  }

  addCliente(formData: Omit<Cliente, 'dataCadastro' | 'atualizadoEm' | 'atendimentos'>) {
    const cliente = Object.assign(formData, {
      dataCadastro: new Date(),
      atualizadoEm: new Date(),
      atendimentos: 0,
    });

    this.db.createCliente(cliente);
    this.clientesSubject$.next([...this.clientesSubject$.getValue(), cliente]);
  }

  findUserClientesFromConsultas(consultas: Consulta[]) {
    // console.log('FETCH USER  CONSULTAS');

    if (!consultas) return;

    const pacientesIdsInAllUserConsultas: string[] = consultas.reduce((acc, consulta) => {
      acc.push(consulta.idPaciente);
      return acc;
    }, []);

    const uniqueIds = Array.from(new Set([...pacientesIdsInAllUserConsultas]));

    const filteredClientes = this.clientesSubject$
      .getValue()
      .filter(cliente => uniqueIds.includes(cliente.id));

    // this.clientesSubject$.next([...filteredClientes]);
    return of(filteredClientes);
  }

  _destroy() {
    this.clientesSubject$.next([]);
  }
}
