import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Consulta } from './models/consulta.model';
import { AppUser, AuthService } from './services/auth.service';
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

  constructor(
    private db: AngularFirestore,
    private consultasService: ConsultasService,
    public authService: AuthService
  ) {}
  ngOnInit() {
    this.user$ = this.authService.user$ as Observable<AppUser>;

    this.user$
      .pipe(
        // delay(1000),
        tap((user) => {
          if (user) {
            console.log('QUERO SABER AS CONSULTAS DO USER');
            console.log(user);
          }
          // if (user) {
          //   this.consultasService.fetchUserConsultas(user);
          // }
        })
      )
      .subscribe();
  }
}
