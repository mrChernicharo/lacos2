import { Component, Input, OnInit } from '@angular/core';
import { Consulta } from 'src/app/models/consulta.model';

@Component({
  selector: 'app-edit-relatorio',
  templateUrl: './edit-relatorio.component.html',
  styleUrls: ['./edit-relatorio.component.scss'],
})
export class EditRelatorioComponent implements OnInit {
  @Input() consultas: Consulta[];
  constructor() {}

  ngOnInit(): void {}
}
