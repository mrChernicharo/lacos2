import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente.model';
import { Consulta } from 'src/app/models/consulta.model';
import { AppUser, AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  clientes$: Observable<Cliente[]>;
  currentPage$: Observable<string>;
  user: AppUser;
  consultas: Consulta[];
  clientes: Cliente[];
  destroySubject$ = new Subject<boolean>();
  appClientes$: Observable<Cliente[]>;
  appClientes: Cliente[];
  consultas$: Observable<Consulta[]>;

  constructor(
    private authService: AuthService,
    private consultasService: ConsultasService,
    private clientesService: ClientesService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.clientesService.fetchAllClientes();

    this.currentPage$ = this.headerService.currentPage$.pipe(
      tap(page => {
        // {console.log(page)}
      })
    );

    this.appClientes$ = this.clientesService._clientes$.pipe(
      // takeUntil(this.destroySubject$),
      tap(clientes => {
        this.appClientes = clientes;
        console.log('appclientes');
        console.log(clientes);
      }),
      finalize(() => console.log('clientes completed!'))
    );

    // this.authService.user$.pipe(
    //   takeUntil(this.destroySubject$),
    //   tap(data => {
    //     console.log(data);
    //     this.user = data as AppUser;
    //   })
    // );

    this.consultas$ = this.consultasService._consultas$.pipe(
      // takeUntil(this.destroySubject$),
      tap(consultas => {
        this.consultas = consultas;
      }),
      finalize(() => console.log('consultas completed!'))
    );
  }

  ngOnDestroy() {
    this.destroySubject$.next(true);
  }
}
