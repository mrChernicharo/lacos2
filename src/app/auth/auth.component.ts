import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  AuthProcessService,
  AuthProvider,
  NgxAuthFirebaseUIConfig,
  Theme,
} from 'ngx-auth-firebaseui';

import { tap } from 'rxjs/operators';
import { AuthService, UserAuthData } from '../services/auth.service';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit {
  authState$ = new BehaviorSubject<UserAuthData>(null);
  providers = AuthProvider;
  themes = Theme;
  uiConfig: NgxAuthFirebaseUIConfig;
  flipped = false;

  // flipped$ = new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private headerService: HeaderService,
    private authProcess: AuthProcessService
  ) {}

  ngOnInit(): void {
    console.log(this.themes.MINI_FAB);
    // this.flipped$.pipe(tap((state) => console.log(state)));
    // this.uiConfig.toastMessageOnAuthSuccess = true;
    // this.uiConfig.toastMessageOnAuthError = true;

    // this.router.navigate(['auth/login']);
    // this.authState$ = this.authService.authState$.pipe(
    //   tap((user) => {
    //     console.log(user);
    //   })
    // );
  }

  flipCard() {
    this.flipped = !this.flipped;
  }

  onStrengthChanged(event) {
    console.log(event);
  }

  onSuccess(event) {
    console.log(event);
    console.log('onSuccess');
    const userData: UserAuthData = {
      id: null,
      nome: event.displayName,
      email: event.email,
      dataCriacao: new Date(),
      isAuth: true,
      role: 'profissional',
      ultimoAcesso: new Date(),
      token: event.refreshToken,
      avatarImg: event.photoURL,
    };
    this.authService.handleAuthSuccess(userData);
  }
  onError(event) {
    console.log(event);
  }
}
// confirmationText =
//   "Um e-mail de confirmação foi enviado. Verifique sua caixa de entrada e clique no link 'Confirmar meu email' para confirmar seu endereço de e-mail.";
