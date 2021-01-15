import { Component, Input, OnInit } from '@angular/core';
import { NbCalendarDayCellComponent, NbDateService } from '@nebular/theme';
import { Consulta } from 'src/app/models/consulta.model';

@Component({
  selector: 'app-custom-day-cell',
  templateUrl: './custom-day-cell.component.html',
  styleUrls: ['./custom-day-cell.component.scss'],
})
export class CustomDayCellComponent<Date>
  extends NbCalendarDayCellComponent<Date>
  implements OnInit {
  constructor(public dateService: NbDateService<Date>) {
    super(dateService);
  }
  // @Input()  date
  @Input() consultas: Consulta[];
  ngOnInit(): void {
    console.log(this.consultas);
  }
}
