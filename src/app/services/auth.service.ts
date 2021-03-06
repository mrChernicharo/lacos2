import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
  takeUntil,
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
  private userSubject$ = new BehaviorSubject<AppUser>(null);
  // authState$ = this.authStateSubject$.asObservable();

  // user$: Observable<FireUser | AppUser>;
  user$: Observable<AppUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: DbService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      // quando não logado, os dados vem brutos do firebase
      // quando vc já tem conta, os dados já foram processados e ao invés de FireUser, temos um obj AppUser
      tap(authUser => {
        // console.log('1. authService constructor -> ANGULAR FIRE AUTH STATE');
        // console.log(authUser);
      }),
      switchMap(authUser => {
        if (authUser) {
          // console.log('2. ANGULAR FIRE AUTH STATE == TRUE -> VÁ AO BANCO');
          return this.db.getFireUser(authUser);
        } else {
          // console.log('2. ANGULAR FIRE AUTH STATE == NULL');
          return of(null);
        }
      }),
      // distinctUntilChanged(),
      // shareReplay(),
      finalize(() => {
        // console.log('user$ observable completada')
      })
    );
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);

    return this.updateUserData(credential.user, true);
  }

  async updateUserData(user, isGoogleSignin = false, isCreateAccount = false) {
    const userRef: AngularFirestoreDocument<any> = this.db.getUserDoc(user);
    console.log(userRef);
    const userData: AppUser = {
      id: user.uid,
      nome: user.displayName,
      email: user.email,
      token: user.refreshToken,
      avatarImg: user.photoURL,
      role: 'profissional',
      dataCriacao: user.metadata.a, // Seconds
      ultimoAcesso: user.metadata.b,
    };

    if (isGoogleSignin) {
      return userRef.set(userData, {
        mergeFields: ['id', 'nome', 'token', 'avatarImg', 'ultimoAcesso'],
      }); // update only changing fields, so..it changes only the 1st time...or maybe if user changes it`s profile pic on google..
    }
    if (isCreateAccount) {
      return userRef.set(userData);
      //
    } else {
      return userRef.set(userData, {
        mergeFields: ['id', 'token', 'avatarImg', 'ultimoAcesso'],
      });
    }
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/auth']);
    });
    // this.user$ = of(null)
  }

  login(email: string, password: string) {
    // console.log('1 SIGN IN WITH EMAIL AND PASSWORD, PASSWORD: ' + password);
    this.afAuth.signInWithEmailAndPassword(email, password).then(respData => {
      // console.log(respData);
      this.updateUserData(respData.user);
    });
  }

  signup(nome: string, email: string, password: string) {
    console
      .log
      // '1 CREATE ACCOUNT WITH EMAIL AND PASSWORD, PASSWORD: ' + password
      ();
    this.afAuth.createUserWithEmailAndPassword(email, password).then(respData => {
      // console.log(respData);
      this.updateUserData(
        { ...respData.user, displayName: nome },
        false, // isGoogle X
        true // isCreateAccount ✔︎
      );
    });
  }
}
