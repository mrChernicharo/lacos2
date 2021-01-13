import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
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

export interface AppUser {
  id: string;
  nome: string;
  email: string;
  dataCriacao: Date;
  ultimoAcesso: Date;
  role: 'profissional' | 'admin' | 'cliente';
  token: string;
  avatarImg: string;
}

export interface FireUser {
  uid: string;
  email: string;
  displayName: string;
  photoUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStateSubject$ = new BehaviorSubject<AppUser>(null);
  authState$ = this.authStateSubject$.asObservable();

  user$: Observable<FireUser | AppUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: DbService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      // quando não logado, os dados vem brutos do firebase
      // quando vc já tem conta, os dados já foram processados e ao invés de FireUser, temos um obj AppUser
      tap((authUser) => {
        console.log('1. authService constructor -> ANGULAR FIRE AUTH STATE');
        console.log(authUser);
      }),
      switchMap((authUser) => {
        if (authUser) {
          console.log('2. ANGULAR FIRE AUTH STATE == TRUE -> VÁ AO BANCO');
          return this.db.getFireUser(authUser);
        } else {
          console.log('2. ANGULAR FIRE AUTH STATE == NULL');
          return of(null);
        }
      }),
      finalize(() => console.log('user$ observable completada'))
    );
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);

    console.log('GOOGLE SIGNIN () => provider & credential');
    console.log(provider);
    console.log(credential);

    return this.updateUserData(credential.user);
  }

  async updateUserData(user) {
    console.log('UPDATE USER DATA');
    console.log(user);

    const userRef: AngularFirestoreDocument<any> = this.db.getUserDoc(user);
    console.log(userRef);
    const userData: AppUser = {
      id: user.uid,
      nome: user.displayName,
      email: user.email,
      token: user.refreshToken,
      avatarImg: user.photoURL,
      role: 'profissional',
      dataCriacao: user.metadata.a, // miliseconds
      ultimoAcesso: user.metadata.b,
    };

    return userRef.set(userData, {
      mergeFields: ['id', 'nome', 'token', 'avatarImg', 'ultimoAcesso'],
    }); // update only changing fields, so..it changes only the 1st time...or maybe if user changes it`s profile pic on google..
  }

  signOut() {
    this.afAuth.signOut();
    this.router.navigate(['/auth']);
  }

  login(email: string, password: string) {}

  signup(nome: string, email: string, password: string) {}

  // handleAuthSuccess(user: AppUser) {
  //   this.db
  //     .checkUserExists(user)
  //     .pipe(
  //       catchError((err) => throwError(err)),
  //       finalize(() => () => {
  //         console.log('complete!');
  //         this.redirectUser(user.role);
  //       })
  //     )
  //     .subscribe((exists) => {
  //       if (!exists) {
  //         this.db.createUser(user);
  //       }
  //     });
  // }
  // signup(nome: string, email: string, password: string) {
  //   from(this.afAuth.createUserWithEmailAndPassword(email, password))
  //     .pipe(
  //       take(1),
  //       shareReplay(),
  //       // tap((data) => console.log(data)),
  //       map((data) => {
  //         const newUser: AppUser = {
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
