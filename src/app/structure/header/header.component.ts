import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  routerState$: Observable<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) // private routeSnapshot: ActivatedRouteSnapshot
  {}

  ngOnInit(): void {
    this.routerState$ = this.router.events.pipe(
      tap((state) => console.log(state))
    );
  }
}
