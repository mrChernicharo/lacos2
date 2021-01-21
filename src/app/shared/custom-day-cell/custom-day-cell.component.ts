import {
  AfterContentChecked,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { NbCalendarDayCellComponent, NbDateService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Consulta } from 'src/app/models/consulta.model';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-custom-day-cell',
  templateUrl: './custom-day-cell.component.html',
  styleUrls: ['./custom-day-cell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
// AfterViewChecked,
// OnChanges,
export class CustomDayCellComponent<Date>
  extends NbCalendarDayCellComponent<Date>
  implements OnInit, AfterContentChecked {
  constructor(
    public dateService: NbDateService<Date>,
    public consultasService: ConsultasService,
    private cd: ChangeDetectorRef
  ) {
    super(dateService);
  }

  date: Date;
  totalConsultas: number;
  showTotal: boolean;

  ngOnInit(): void {
    this.getIsBusyDay();
  }

  ngAfterContentChecked() {
    this.getIsBusyDay();
  }

  getIsBusyDay() {
    if (this.consultasService.isBusyDay(this.date)) {
      this.dayCellClass = true;
      this.totalConsultas = this.consultasService.getConsultasAmountInDay(
        this.date
      );
      this.showTotal = true;
    } else {
      this.dayCellClass = false;
      this.showTotal = false;
    }
  }
}
