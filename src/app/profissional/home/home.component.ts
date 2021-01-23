import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NbCalendarComponent, NbCalendarDayCellComponent } from '@nebular/theme'
import { forkJoin, from, fromEvent, Observable, of } from 'rxjs'
import { delay, filter, map, skip, switchMap, tap, timeout } from 'rxjs/operators'
import { AppData } from 'src/app/app.component'
import { Cliente } from 'src/app/models/cliente.model'
import { Consulta } from 'src/app/models/consulta.model'
import { AppUser, AuthService } from 'src/app/services/auth.service'
import { ClientesService } from 'src/app/services/clientes.service'
import { ConsultasService } from 'src/app/services/consultas.service'
import { HeaderService } from 'src/app/services/header.service'
import { CustomDayCellComponent } from 'src/app/shared/custom-day-cell/custom-day-cell.component'
import { IReportFormConsulta } from './novo-relatorio/novo-relatorio.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnChanges, OnDestroy {
  // clientes$: Observable<Cliente[]>;
  currentPage$: Observable<string>
  user: AppUser
  consultas: Consulta[]
  reportConsultas: Consulta[]
  appClientes: Cliente[]

  filteredConsultasCount: Object
  calendar = new NbCalendarComponent<Date>()
  calendarSubs: Observable<Date>

  user$: Observable<AppUser>
  consultas$: Observable<Consulta[]>
  appClientes$: Observable<Cliente[]>
  userClientes$: Observable<Cliente[]>
  selectedDate: Date
  dayCellComponent = CustomDayCellComponent
  // subs: Observable<[AppUser, Consulta[], Cliente[], Cliente[]]>;
  // appData$: Observable<AppData>;
  // previousSelected: any;

  constructor(
    public clientesService: ClientesService,
    private consultasService: ConsultasService,
    private headerService: HeaderService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.')
  }

  ngOnInit(): void {
    this.reportConsultas = []

    this.currentPage$ = this.headerService.currentPage$.pipe(
      tap((page) => {
        console.log(page)
      })
    )
    this.appClientes$ = this.clientesService._clientes$.pipe(
      tap((clientes) => {
        this.appClientes = clientes
        console.log('appclientes')
        console.log(clientes)
      })
    )

    this.authService.user$.pipe(
      tap((data) => {
        console.log(data)
        this.user = data as AppUser
      })
    )

    this.consultas$ = this.consultasService._consultas$.pipe(
      tap((consultas) => {
        this.consultas = consultas
      }),
      tap((consultas) => {
        this.userClientes$ = this.clientesService.findUserClientesFromConsultas(consultas)
      })
    )
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}

  filterModalidades(consultas: Consulta[]) {
    if (!consultas) return

    let obj = new Object()

    consultas.forEach((consulta, i) => {
      if (!obj.hasOwnProperty(consulta.modalidade)) {
        obj[consulta.modalidade] = 0
      }
      obj[consulta.modalidade] += 1
    })
    console.log(obj)
    this.filteredConsultasCount = obj
    return obj
  }

  onChangeCalendarDate(date: Date) {
    if (
      this.consultas.find(
        (consulta) =>
          new Date(consulta.dataConsulta['seconds']).toDateString() === date.toDateString()
      )
    ) {
      this.filterConsultas(date)
    }
    this.calendar.dateChange.emit(this.selectedDate)
  }

  filterConsultas(date: Date) {
    // console.log(date);
    const filteredConsultas = this.consultas
      .filter(
        (consulta) =>
          new Date(consulta.dataConsulta['seconds']).toDateString() === date.toDateString()
      )
      .sort((a, b) => +a.horario.replace(':', '') - +b.horario.replace(':', ''))
    this.reportConsultas = filteredConsultas
  }

  // updateCellData(event) {
  //   console.log(event);
  // }
}
