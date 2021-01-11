import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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

  constructor(private afAuth: AngularFireAuth, private db: DbService) {
    // this.authState$.pipe(startWith([]));
  }

  signup(nome: string, email: string, password: string) {
    from(this.afAuth.createUserWithEmailAndPassword(email, password))
      .pipe(
        take(1),
        shareReplay(),
        catchError((err) => throwError(err)),
        tap((data) => console.log(data)),
        map((data) => {
          const newUser: UserAuthData = {
            id: null,
            nome: nome,
            email: data.user.email,
            dataCriacao: new Date(),
            isAuth: true,
            role: 'profissional',
            ultimoAcesso: new Date(),
            token: data.user.refreshToken,
            avatarImg: data.user.photoURL,
          };
          return newUser;
        }),
        tap((user) => this.db.createUser(user)),
        tap((user) => this.authStateSubject$.next(user)),
        finalize(() => console.log('completed signup!'))
      )
      .subscribe();
  }

  login(email: string, password: string) {
    // console.log(email, password);
    from(this.afAuth.signInWithEmailAndPassword(email, password))
      .pipe(tap((data) => console.log(data)))
      .subscribe();
  }
}
