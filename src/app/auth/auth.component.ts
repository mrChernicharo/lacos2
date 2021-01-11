import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthProvider } from 'ngx-auth-firebaseui';

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
  authState$: Observable<UserAuthData>;
  providers = AuthProvider;

  constructor(
    private router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    // this.router.navigate(['auth/login']);
    // this.authState$ = this.authService.authState$.pipe(
    //   tap((user) => {
    //     console.log(user);
    //   })
    // );
  }
}
