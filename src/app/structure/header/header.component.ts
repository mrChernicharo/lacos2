import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { appIcons } from '../../../assets/app-icons';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  defaultUserIcon = appIcons.curlyGuy;
  lacosIcon = appIcons.lacos;

  routerState$: Observable<string>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute // private routeSnapshot: ActivatedRouteSnapshot
  ) {}

  ngOnInit(): void {
    this.routerState$ = this.router.events.pipe(
      filter(
        (state: any) => state.__proto__.constructor.name === 'NavigationStart'
      ),
      map((state: NavigationStart) => {
        console.log(state.url.split('/'));
        return state.url.split('/').pop().replace('-', ' ');
      })
    );
  }

  goToPage(page: string) {
    console.log(page);
    switch (page) {
      case 'profissional':
        this.router.navigate(['profissional/novo-relatorio']);
        break;
      case 'admin':
        this.router.navigate(['admin/clientes']);
        break;
      case 'novo relatorio':
        this.router.navigate(['profissional']);
        break;
      case 'clientes':
        this.router.navigate(['admin']);
        break;
    }
  }
}
