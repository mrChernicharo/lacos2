import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import { AppData } from 'src/app/app.component';
import { Cliente } from 'src/app/models/cliente.model';
import { Consulta } from 'src/app/models/consulta.model';
import { AppUser, AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { HeaderService } from 'src/app/services/header.service';
import { IReportFormConsulta } from './novo-relatorio/novo-relatorio.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  // clientes$: Observable<Cliente[]>;
  currentPage$: Observable<string>;
  user: AppUser;
  consultas: Consulta[];
  appClientes: Cliente[];

  filteredConsultasCount: Object;

  user$: Observable<AppUser>;
  consultas$: Observable<Consulta[]>;
  appClientes$: Observable<Cliente[]>;
  // appData$: Observable<AppData>;
  userClientes$: Observable<Cliente[]>;

  constructor(
    public clientesService: ClientesService,
    private consultasService: ConsultasService,
    private headerService: HeaderService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentPage$ = this.headerService.currentPage$.pipe(
      tap((page) => {
        console.log(page);
        // this.route.data.subscribe((data) => console.log(data));
      })
    );
    this.appClientes$ = this.clientesService._clientes$.pipe(
      tap((clientes) => {
        this.appClientes = clientes;
        console.log('appclientes');
        console.log(clientes);
      })
    );

    // this.clientes$.subscribe();

    this.authService.user$.pipe(
      tap((data) => {
        console.log(data);
        this.user = data as AppUser;
      })
    );

    this.consultas$ = this.consultasService._consultas$.pipe(
      tap((consultas) => {
        this.consultas = consultas;
      }),
      // delay(1000),
      tap((consultas) => {
        this.userClientes$ = this.clientesService.findUserClientes(consultas);
      })
    );
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}

  filterModalidades(consultas: Consulta[]) {
    if (!consultas) return;

    let obj = new Object();

    consultas.forEach((consulta, i) => {
      if (!obj.hasOwnProperty(consulta.modalidade)) {
        obj[consulta.modalidade] = 0;
      }
      obj[consulta.modalidade] += 1;
    });
    console.log(obj);
    this.filteredConsultasCount = obj;
    return obj;
  }
}
