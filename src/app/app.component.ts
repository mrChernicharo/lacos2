import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, combineLatest } from 'rxjs';
import { delay, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { Cliente } from './models/cliente.model';
import { Consulta } from './models/consulta.model';
import { AppUser, AuthService } from './services/auth.service';
import { ClientesService } from './services/clientes.service';
import { ConsultasService } from './services/consultas.service';

// export interface AppData{
//   user: AppUser,
//   consultas: Consulta[],
//   clientes: Cliente[]
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lacos2';
  user$: Observable<AppUser>;
  clientes$: Observable<Cliente[]>;
  consultas$: Observable<Consulta[]>;
  appData$: Observable<[AppUser, Consulta[], Cliente[]]>;

  constructor(
    private db: AngularFirestore,
    private consultasService: ConsultasService,
    private clientesService: ClientesService,
    public authService: AuthService
  ) {}
  ngOnInit() {
    this.user$ = this.authService.user$ as Observable<AppUser>;
    this.clientes$ = this.clientesService._clientes$;
    this.consultas$ = of([]);

    this.user$
      .pipe(
        // delay(1000),
        shareReplay(),
        tap((user) => {
          if (user) {
            // console.log('QUERO SABER AS CONSULTAS DO USER');
            console.log(user);
            this.consultas$ = this.consultasService.fetchUserConsultas(user);
          }
          // if (user) {
          // }
        }),
        tap(() => {
          this.appData$ = combineLatest(
            this.user$,
            this.consultas$,
            this.clientes$
          ).pipe(tap((data) => console.log(data)));

          this.appData$.subscribe();
        })
      )
      .subscribe();
  }

  onActivate(routerData, user, clientes, consultas) {
    routerData['user'] = user;
    routerData['clientes'] = clientes;
    routerData['consultas'] = consultas;

    console.log('activate');
    console.log(routerData);
  }
  onDeactivate(routerData, user?, clientes?, consultas?) {
    routerData['user'] = user;
    routerData['clientes'] = clientes;
    routerData['consultas'] = consultas;
    console.log('deactivate');
    console.log(routerData);
  }
}
