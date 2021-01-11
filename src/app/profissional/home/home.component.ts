import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  clientes$: Observable<Cliente[]>;
  currentPage$: Observable<string>;

  constructor(
    private clientesService: ClientesService,
    private headerService: HeaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientes$ = this.clientesService._clientes$;
    this.currentPage$ = this.headerService.currentPage$;
  }

  onActivate(event, clientes: Cliente[]) {
    event['clientes'] = clientes;
  }

  onDeactivate(event) {
    console.log(event);
  }
}
