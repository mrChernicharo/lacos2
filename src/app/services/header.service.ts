import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  // ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  currentPage$: Observable<string>;
  // private currentPageSubject$ = new BehaviorSubject<string>('logoff');
  // public currentPage$ = this.currentPageSubject$.asObservable();

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.currentPage$ = this.router.events.pipe(
      filter((state: any) => state.__proto__.constructor.name === 'NavigationEnd'),
      tap(state => {
        console.log(state);
      }),
      map((state: NavigationEnd) => {
        return state.url;
      }),
      tap(url => {
        console.log(url);
      }),
      map(url => {
        //
        return url === '/' ? 'auth' : url.split('/').pop().replace('-', ' ');
      }),
      shareReplay()

      // tap((page) => this.currentPageSubject$.next(page))
    );
  }
}
