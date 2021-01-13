import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente.model';
import { Consulta } from 'src/app/models/consulta.model';
import { AppUser } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  clientes$: Observable<Cliente[]>;
  currentPage$: Observable<string>;
  user: AppUser;
  consultas: Consulta[];
  clientes: Cliente[];

  constructor(
    private clientesService: ClientesService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.currentPage$ = this.headerService.currentPage$.pipe(
      tap((page) => {
        // {console.log(page)}
      })
    );
  }
}
