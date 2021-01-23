import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthProvider, NgxAuthFirebaseUIConfig, Theme } from 'ngx-auth-firebaseui';

import { tap } from 'rxjs/operators';
import { AuthService, AppUser } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit {
  authState$ = new BehaviorSubject<AppUser>(null);
  providers = AuthProvider;
  themes = Theme;
  uiConfig: NgxAuthFirebaseUIConfig;
  flipped = false;
  user$: Observable<AppUser>;
  userConsultas$;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // console.log(this.themes.MINI_FAB);
    this.user$ = this.authService.user$.pipe(
      tap((user: AppUser) => {
        if (user) {
          this.redirectUser(user.role);
        }
      })
    );
  }

  onGoogleLogin() {
    this.authService.googleSignin();
  }

  flipCard() {
    this.flipped = !this.flipped;
  }

  redirectUser(role: string) {
    role === 'admin'
      ? this.router.navigate(['admin'])
      : this.router.navigate(['profissional']);
  }

  // onStrengthChanged(event) {
  //   console.log(event);
  // }
}
// confirmationText =
//   "Um e-mail de confirmação foi enviado. Verifique sua caixa de entrada e clique no link 'Confirmar meu email' para confirmar seu endereço de e-mail.";
