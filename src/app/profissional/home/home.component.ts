import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  clientes$: Observable<Cliente[]>;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.clientes$ = this.clientesService._clientes$;
  }

  onActivate(event, clientes: Cliente[]) {
    // console.log(event);
    // console.log(clientes);
    event['clientes'] = clientes;
  }

  onDeactivate(event) {
    console.log(event);
  }
}
