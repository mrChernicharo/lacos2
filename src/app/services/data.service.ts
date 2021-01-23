import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppData } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  appData$: Observable<AppData>;

  constructor() {}
}
