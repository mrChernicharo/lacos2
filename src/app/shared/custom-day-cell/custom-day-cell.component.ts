import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NbCalendarDayCellComponent, NbDateService } from '@nebular/theme';
import { Consulta } from 'src/app/models/consulta.model';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-custom-day-cell',
  templateUrl: './custom-day-cell.component.html',
  styleUrls: ['./custom-day-cell.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomDayCellComponent<Date>
  extends NbCalendarDayCellComponent<Date>
  implements OnInit {
  constructor(
    public dateService: NbDateService<Date>,
    public consultasService: ConsultasService
  ) {
    super(dateService);
  }
  date: Date;
  totalConsultas: number;
  // @Input() consultas: Consulta[];
  ngOnInit(): void {
    if (this.consultasService.isBusyDay(this.date)) {
      this.dayCellClass = true;
    } else {
      this.dayCellClass = false;
    }

    if (this.dayCellClass) {
      this.totalConsultas = this.consultasService.getConsultasAmountInDay(
        this.date
      );
    }
    // console.log(this.consultas);
  }
}
