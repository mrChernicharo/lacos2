import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-clientes',
  templateUrl: './add-clientes.component.html',
  styleUrls: ['./add-clientes.component.scss'],
})
export class AddClientesComponent implements OnInit {
  public origens = ['clinica', 'flamengo', 'vale', 'cpII'];

  constructor() {}

  ngOnInit(): void {}
}
