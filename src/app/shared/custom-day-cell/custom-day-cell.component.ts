import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NbCalendarDayCellComponent, NbDateService } from '@nebular/theme';
import { defer, Observable, of, timer } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  finalize,
  skip,
  take,
  tap,
  throttleTime,
} from 'rxjs/operators';
import { Consulta } from 'src/app/models/consulta.model';
import { ConsultasService } from 'src/app/services/consultas.service';

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
  @HostBinding('id') id: string;
  public date: any;
  totalConsultas: number;
  showTotal: boolean;

  constructor(
    public dateService: NbDateService<Date>,
    public consultasService: ConsultasService,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) {
    super(dateService);
  }

  ngOnInit(): void {
    this.getIsBusyDay();
    this.id = `${this.date.getDate()}-${this.date.getMonth() + 1}`;
  }

  ngAfterViewInit() {
    // this.renderer.setAttribute(this.cell, 'id', `${this.date.toString()}`);
    this.cd.detach();
    // const el = window.document.querySelector(`#${date.getDate()}-${date.getMonth() + 1}`);
    // this.renderer.addClass(el, 'selected');
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
      );

      obs$.subscribe();
    }
  }

  getIsBusyDay() {
    if (this.consultasService.isBusyDay(this.date)) {
      this.dayCellClass = true;
      this.totalConsultas = this.consultasService.getConsultasAmountInDay(this.date);
      this.showTotal = true;
    } else {
      this.dayCellClass = false;
      this.showTotal = false;
    }
  }
}
