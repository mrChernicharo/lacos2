import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Consulta } from 'src/app/models/consulta.model';

@Component({
  selector: 'app-cliente-card',
  templateUrl: './cliente-card.component.html',
  styleUrls: ['./cliente-card.component.scss'],
})
export class ClienteCardComponent implements OnInit {
  @Input() cliente: Cliente;
  @Input() allConsultas: Consulta[];
  clienteConsultas: Consulta[];
  constructor() {}

  ngOnInit(): void {
    this.clienteConsultas = this.allConsultas.filter(
      (consulta) => consulta.idPaciente === this.cliente.id
    );
  }
}
