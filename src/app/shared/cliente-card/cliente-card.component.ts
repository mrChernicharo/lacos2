import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Consulta } from 'src/app/models/consulta.model';
import { appIcons } from '../../../assets/app-icons';
import {} from '@nebular/theme';

@Component({
  selector: 'app-cliente-card',
  templateUrl: './cliente-card.component.html',
  styleUrls: ['./cliente-card.component.scss'],
})
export class ClienteCardComponent implements OnInit {
  @Input() cliente: Cliente;
  @Input() allConsultas: Consulta[];
  clienteConsultas: Consulta[];
  avatarImg: string;
  firstConsulta: Consulta;
  lastConsulta: Consulta;

  constructor() {}

  ngOnInit(): void {
    this.clienteConsultas = this.allConsultas
      .filter((consulta) => consulta.idPaciente === this.cliente.id)
      .sort((a, b) => a.dataConsulta['seconds'] - b.dataConsulta['seconds']);

    this.firstConsulta = this.clienteConsultas[0];

    this.lastConsulta = this.clienteConsultas[this.clienteConsultas.length - 1];

    switch (this.cliente.origem) {
      case 'clínica':
        this.avatarImg = appIcons.rose;
        break;
      case 'flamengo':
        this.avatarImg = appIcons.flamengo;
        break;
      case 'vale':
        this.avatarImg = appIcons.vale;
        break;
      case 'cpII':
        this.avatarImg = appIcons.cp2;
        break;
    }
  }
}
