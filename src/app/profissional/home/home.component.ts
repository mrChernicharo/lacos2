import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
export class HomeComponent implements OnInit, OnDestroy {
  // clientes$: Observable<Cliente[]>;
  currentPage$: Observable<string>;
  user: AppUser;
  consultas: Consulta[];
  clientes: Cliente[];

  filteredConsultasCount: Object;

  user$: Observable<AppUser>;
  consultas$: Observable<Consulta[]>;
  clientes$: Observable<Cliente[]>;
  appData$: Observable<AppData>;

  constructor(
    private clientesService: ClientesService,
    private consultasService: ConsultasService,
    private headerService: HeaderService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentPage$ = this.headerService.currentPage$.pipe(
      tap((page) => {
        // console.log(page)
        // this.route.data.subscribe((data) => console.log(data));
      })
    );

    // this.appData$.subscribe((data) => console.log(data));
    // this.filterModalidades(this.consultas);
  }

  ngOnDestroy() {}

  filterModalidades(consultas: Consulta[]) {
    // console.log(consultas);
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
