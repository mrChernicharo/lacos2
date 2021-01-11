import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState$ = new Observable<any>();

  constructor(private afAuth: AngularFireAuth) {
    // this.authState$.pipe(startWith([]));
  }

  signup(nome: string, email: string, password: string) {
    // console.log(nome, email, password);
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(tap((response) => (this.authState$ = of(response))));
  }

  login(email: string, password: string) {
    console.log(email, password);
  }
}
