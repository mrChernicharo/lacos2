import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core'
import { NbCalendarDayCellComponent, NbDateService } from '@nebular/theme'
import { defer, Observable, of, timer } from 'rxjs'
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  finalize,
  skip,
  take,
  tap,
  throttleTime,
} from 'rxjs/operators'
import { Consulta } from 'src/app/models/consulta.model'
import { ConsultasService } from 'src/app/services/consultas.service'

@Component({
  selector: 'app-custom-day-cell',
  templateUrl: './custom-day-cell.component.html',
  styleUrls: ['./custom-day-cell.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
//
// OnChanges,
export class CustomDayCellComponent<Date>
  extends NbCalendarDayCellComponent<Date>
  implements OnInit, AfterContentChecked, AfterViewInit {
  constructor(
    public dateService: NbDateService<Date>,
    public consultasService: ConsultasService,
    private cd: ChangeDetectorRef
  ) {
    super(dateService)
  }

  date: Date
  totalConsultas: number
  showTotal: boolean

  ngOnInit(): void {
    this.getIsBusyDay()
  }

  ngAfterViewInit() {
    this.cd.detach()
  }

  ngAfterContentChecked() {
    if (this.showTotal && this.totalConsultas) {
      // console.log('opa')
      const obs$ = of(0).pipe(
        // throttleTime(200),
        // first(),
        take(1),
        tap(() => this.cd.reattach()),
        // tap(() => console.log('attached')),
        // tap(() => console.log('change!')),
        tap(() => this.getIsBusyDay()),
        delay(10),
        // tap(() => console.log('detach!')),
        tap(() => this.cd.detach())
        // finalize(() => console.log('completed!'))
      )

      obs$.subscribe()
    }
  }

  getIsBusyDay() {
    if (this.consultasService.isBusyDay(this.date)) {
      this.dayCellClass = true
      this.totalConsultas = this.consultasService.getConsultasAmountInDay(this.date)
      this.showTotal = true
    } else {
      this.dayCellClass = false
      this.showTotal = false
    }
  }
}
