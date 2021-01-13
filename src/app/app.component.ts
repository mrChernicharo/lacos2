import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Cliente } from './models/cliente.model';
import { Consulta } from './models/consulta.model';
import { AppUser, AuthService } from './services/auth.service';
import { ClientesService } from './services/clientes.service';
import { ConsultasService } from './services/consultas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lacos2';
  user$: Observable<AppUser>;
  consultas$: Observable<Consulta[]>;
  clientes$: Observable<Cliente[]>;

  constructor(
    private db: AngularFirestore,
    private consultasService: ConsultasService,
    private clientesService: ClientesService,
    public authService: AuthService
  ) {}
  ngOnInit() {
    this.user$ = this.authService.user$ as Observable<AppUser>;
    this.clientes$ = this.clientesService._clientes$;

    this.user$
      .pipe(
        // delay(1000),
        tap((user) => {
          if (user) {
            console.log('QUERO SABER AS CONSULTAS DO USER');
            console.log(user);
            this.consultas$ = this.consultasService.fetchUserConsultas(user);
          }
          // if (user) {
          // }
        })
      )
      .subscribe();
  }

  onActivate(routerData, user, clientes, consultas) {
    routerData['user'] = user;
    routerData['clientes'] = clientes;
    routerData['consultas'] = consultas;
    console.log(routerData);
  }
  onDeactivate(routerData) {
    console.log('deactivate');
    console.log(routerData);
  }
}
