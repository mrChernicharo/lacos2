import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, combineLatest } from 'rxjs';
import { delay, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { Cliente } from './models/cliente.model';
import { Consulta } from './models/consulta.model';
import { AppUser, AuthService } from './services/auth.service';
import { ClientesService } from './services/clientes.service';
import { ConsultasService } from './services/consultas.service';

export type AppData = [AppUser, Consulta[], Cliente[]];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'lacos2';
  user$: Observable<AppUser>;
  clientes$: Observable<Cliente[]>;
  consultas$: Observable<Consulta[]>;
  appData$: Observable<AppData>;

  constructor(
    private db: AngularFirestore,
    private consultasService: ConsultasService,
    private clientesService: ClientesService,
    public authService: AuthService
  ) {}
  ngOnInit() {
    this.user$ = this.authService.user$ as Observable<AppUser>;

    this.clientes$ = this.clientesService._clientes$;
    this.consultas$ = this.consultasService._consultas$.pipe(
      tap((consultas) => console.log(consultas))
    );

    this.user$
      .pipe(
        // delay(1000),
        shareReplay(),
        tap((user) => {
          if (user) {
            console.log('QUERO SABER AS CONSULTAS DO USER');
            console.log(user);
            this.consultasService.fetchUserConsultas(user).toPromise();
          }
        }),
        tap(() => {
          this.appData$ = combineLatest([
            this.user$,
            this.consultas$,
            this.clientes$,
          ]).pipe(tap((data) => console.log(data)));
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {}
  // onActivate(routerData, user, clientes, consultas) {
  //   routerData['user'] = user;
  //   routerData['clientes'] = clientes;
  //   routerData['consultas'] = consultas;

  //   console.log('activate');
  //   console.log(routerData);
  // }
  // onDeactivate(routerData, user?, clientes?, consultas?) {
  //   routerData['user'] = user;
  //   routerData['clientes'] = clientes;
  //   routerData['consultas'] = consultas;
  //   console.log('deactivate');
  //   console.log(routerData);
  // }
}
