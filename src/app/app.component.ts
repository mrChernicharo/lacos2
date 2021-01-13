import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppUser, AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lacos2';
  user$: Observable<AppUser>;

  constructor(private db: AngularFirestore, public authService: AuthService) {
    this.user$ = this.authService.user$ as Observable<AppUser>;
  }
}
