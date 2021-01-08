import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  // ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private currentPageSubject$ = new BehaviorSubject<string>('');
  public currentPage$ = this.currentPageSubject$.asObservable();

  constructor() // private routeSnapshot: ActivatedRouteSnapshot // private activatedRoute: ActivatedRoute, // private router: Router,
  {}
}
