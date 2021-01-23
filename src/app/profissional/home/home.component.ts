import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbCalendarComponent, NbCalendarDayCellComponent } from '@nebular/theme';
import { forkJoin, from, fromEvent, Observable, of, Subject } from 'rxjs';
import {
  delay,
  filter,
  map,
  skip,
  switchMap,
  takeUntil,
  tap,
  timeout,
} from 'rxjs/operators';
import { AppData } from 'src/app/app.component';
import { Cliente } from 'src/app/models/cliente.model';
import { Consulta } from 'src/app/models/consulta.model';
import { AppUser, AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { HeaderService } from 'src/app/services/header.service';
import { CustomDayCellComponent } from 'src/app/shared/custom-day-cell/custom-day-cell.component';
import { IReportFormConsulta } from './novo-relatorio/novo-relatorio.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  currentPage$: Observable<string>;
  user: AppUser;
  consultas: Consulta[];
  reportConsultas: Consulta[];
  appClientes: Cliente[];
  filteredConsultasCount: Object;

  selectedDate: Date;
  calendar = new NbCalendarComponent<Date>();
  calendarSubs: Observable<Date>;
  dayCellComponent = CustomDayCellComponent;

  user$: Observable<AppUser>;
  consultas$: Observable<Consulta[]>;
  appClientes$: Observable<Cliente[]>;
  userClientes$: Observable<Cliente[]>;
  destroySubject$ = new Subject<boolean>();

  constructor(
    public clientesService: ClientesService,
    private consultasService: ConsultasService,
    private headerService: HeaderService,
    public authService: AuthService,
    public renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.currentPage$ = this.headerService.currentPage$.pipe(
      takeUntil(this.destroySubject$),
      tap(page => {
        console.log(page);
        this.reportConsultas = [];
        this.selectedDate = null;
      })
    );
    this.appClientes$ = this.clientesService._clientes$.pipe(
      takeUntil(this.destroySubject$),
      tap(clientes => {
        this.appClientes = clientes;
        console.log('appclientes');
        console.log(clientes);
      })
    );

    this.authService.user$.pipe(
      takeUntil(this.destroySubject$),
      tap(data => {
        console.log(data);
        this.user = data as AppUser;
      })
    );

    this.consultas$ = this.consultasService._consultas$.pipe(
      takeUntil(this.destroySubject$),
      tap(consultas => {
        this.consultas = consultas;
      }),
      tap(consultas => {
        this.userClientes$ = this.clientesService.findUserClientesFromConsultas(
          consultas
        );
      })
    );
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.destroySubject$.next(true);
  }

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

  onChangeCalendarDate(date: Date) {
    if (
      this.consultas.find(
        consulta =>
          new Date(consulta.dataConsulta['seconds']).toDateString() ===
          date.toDateString()
      )
    ) {
      this.filterConsultas(date);
    }

    this.calendar.dateChange.emit(this.selectedDate);
  }

  filterConsultas(date: Date) {
    const filteredConsultas = this.consultas
      .filter(
        consulta =>
          new Date(consulta.dataConsulta['seconds']).toDateString() ===
          date.toDateString()
      )
      .sort((a, b) => +a.horario.replace(':', '') - +b.horario.replace(':', ''));

    console.log(filteredConsultas);
    this.reportConsultas = filteredConsultas;
  }
}
