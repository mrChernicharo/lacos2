import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  @Output() goToSignup = new EventEmitter();
  // login$: Subscription;
  // @Output() goToLogin = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('teste@teste.com', Validators.required),
      password: new FormControl('223344556677', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  navigateToSignup() {
    // this.router.navigate(['auth/signup']);
    this.goToSignup.emit('event');
  }

  submitData() {
    this.authService.login(
      this.loginForm.value['email'],
      this.loginForm.value['password']
    );
    // .subscribe((data) => {
    //   console.log(data), console.log(data.user.displayName);
    // });
    // .unsubscribe();
  }

  onGoogleLogin() {}
  ngOnDestroy() {
    // this.login$.unsubscribe();
  }
}
