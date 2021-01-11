import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      nome: new FormControl('teste', Validators.required),
      email: new FormControl('teste@teste.com', Validators.required),
      password: new FormControl('223344556677', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submitData() {
    this.authService.signup(
      this.signupForm.value['nome'],
      this.signupForm.value['email'],
      this.signupForm.value['password']
    );
  }
}
