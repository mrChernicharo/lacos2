import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authState$: Observable<any>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.router.navigate(['auth/login']);
    // this.authState$ = this.authService.authState$.pipe(
    //   tap((authState) => console.log(authState)),
    // );
  }
}
