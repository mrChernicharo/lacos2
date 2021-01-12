import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { DbService } from './db.service';

export interface UserAuthData {
  id: string;
  nome: string;
  email: string;
  dataCriacao: Date;
  ultimoAcesso: Date;
  role: 'profissional' | 'admin' | 'cliente';
  isAuth: boolean;
  token: string;
  avatarImg: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStateSubject$ = new BehaviorSubject<UserAuthData>(null);
  authState$ = this.authStateSubject$.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: DbService
  ) {
    // this.authState$.pipe(startWith([]));
  }

  handleAuthSuccess(user: UserAuthData) {
    this.db
      .checkUserExists(user)
      .pipe(
        catchError((err) => throwError(err)),
        finalize(() => () => {
          console.log('complete!');
          this.redirectUser(user.role);
        })
      )
      .subscribe((exists) => {
        if (!exists) {
          this.db.createUser(user);
        }
      });
  }

  redirectUser(role: string) {
    role === 'admin'
      ? this.router.navigate(['profissional'])
      : this.router.navigate(['admin']);
  }

  login(email: string, password: string) {}
  signup(nome: string, email: string, password: string) {}

  // signup(nome: string, email: string, password: string) {
  //   from(this.afAuth.createUserWithEmailAndPassword(email, password))
  //     .pipe(
  //       take(1),
  //       shareReplay(),
  //       // tap((data) => console.log(data)),
  //       map((data) => {
  //         const newUser: UserAuthData = {
  //           id: null,
  //           nome: nome,
  //           email: data.user.email,
  //           dataCriacao: new Date(),
  //           isAuth: true,
  //           role: 'profissional',
  //           ultimoAcesso: new Date(),
  //           token: data.user.refreshToken,
  //           avatarImg: data.user.photoURL,
  //         };
  //         return newUser;
  //       }),
  //       tap((user) => this.db.createUser(user)),
  //       tap((user) => this.authStateSubject$.next(user)),
  //       catchError((err) => throwError(err)),
  //       finalize(() => console.log('completed signup!'))
  //       )
  //       .subscribe();
  //     }

  // login(email: string, password: string) {
  //   // console.log(email, password);
  //   from(this.afAuth.signInWithEmailAndPassword(email, password))
  //     .pipe(tap((data) => console.log(data)))
  //     .subscribe();
  // }
}
