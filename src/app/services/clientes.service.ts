import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  firstFetch = true;
  // _clientes$: Observable<Cliente[]>;

  constructor(
    private db: DbService,
    private consultasService: ConsultasService
  ) {
    this.db
      .fetchAllClientes()
      .pipe(
        tap((data) => {
          console.log(data);
          if (!this.firstFetch) {
            this.clientesSubject$.next(data);
          }
          this.firstFetch = false;
        })
        // take(1)
      )
      .subscribe();
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

  findUserClientes(consultas: Consulta[]) {
    console.log('FETCH USER  CONSULTAS');

    if (!consultas) return;

    const consultasIds: string[] = consultas.reduce((acc, consulta) => {
      acc.push(consulta.idPaciente);
      return acc;
    }, []);

    // console.log(consultasIds);

    const ids = Array.from(new Set([...consultasIds]));

    console.log(ids);

    const allClientes = this.clientesSubject$
      .getValue()
      .filter((cliente) => ids.includes(cliente.id));

    console.log(allClientes);

    this.clientesSubject$.next([...allClientes]);
    // this._clientes$.pipe(
    //   map((clientes) => {
    //     console.log('Filtrando');
    //     console.log(clientes);
    //     return clientes.filter((cliente) => ids.includes(cliente.id));
    //   }),
    //   tap((clientes) => {
    //     console.log('Filtrado');
    //     console.log(clientes);
    //     this.clientesSubject$.next(clientes);
    //   })
    // );
    // .subscribe();
  }

  _destroy() {
    this.clientesSubject$.next([]);
  }
  // getAllClientes() {
  // this._clientes$
  // }
}
