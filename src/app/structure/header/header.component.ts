import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { appIcons } from '../../../assets/app-icons';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import {
  NbContextMenuDirective,
  NbMenuItem,
  NbMenuService,
} from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @ViewChild(NbContextMenuDirective) contextMenu: NbContextMenuDirective;

  defaultUserIcon = appIcons.curlyGuy;
  lacosIcon = appIcons.lacos;

  routerState$: Observable<string>;

  menuItems = [];

  constructor(
    private router: Router,
    // private menuService: NbMenuService,
    private activatedRoute: ActivatedRoute // private routeSnapshot: ActivatedRouteSnapshot
  ) {}

  ngOnInit(): void {
    this.routerState$ = this.router.events.pipe(
      filter(
        (state: any) => state.__proto__.constructor.name === 'NavigationStart'
      ),
      tap((state) => {
        console.log(state);
      }),
      map((state: NavigationStart) => {
        return state.url;
      }),
      tap((url) => {
        console.log(url);
      }),
      map((url) => {
        // console.log(state.url.split('/'));
        const currentPage = url.split('/').pop().replace('-', ' ');
        return currentPage;
      }),
      tap((page) => {
        this.menuItems.length = 0;
        switch (page) {
          case 'profissional':
            this.menuItems.push(
              { title: 'novo-relatorio' },
              { title: 'logoff' }
            );
            break;
          case 'admin':
            this.menuItems.push({ title: 'clientes' }, { title: 'logoff' });
            break;
          case 'novo relatorio':
            this.menuItems.push({ title: 'home' }, { title: 'logoff' });
            break;
          case 'clientes':
            this.menuItems.push({ title: 'dashboard' }, { title: 'logoff' });
            break;
        }
      })
    );
  }

  goToPage(page: string) {
    console.log(page);
    switch (page) {
      case 'profissional':
        return this.router.navigate(['profissional', 'novo-relatorio']);

      case 'admin':
        return this.router.navigate(['admin', 'clientes']);

      case 'novo relatorio':
        return this.router.navigate(['profissional']);

      case 'clientes':
        return this.router.navigate(['admin']);
    }
  }

  // open() {
  //   this.contextMenu.show();
  // }

  // close() {
  //   this.contextMenu.hide();
  // }

  // onMenuToggle() {
  //   this.menuItems[0].expanded = !this.menuItems[0].expanded;
  // }
}

// menuItems: NbMenuItem[] = [
// [
// {
// title: 'Menu',
// icon: 'menu-outline',
// expanded: false,
// },
// children: [
// {
// title: 'Novo Relatório',
// icon: 'plus-outline',
// link: 'profissional/novo-relatorio',
// },
// {
// title: 'Logout',
// icon: 'power-outline',
// link: 'auth',
// },
// ],
// },
// {
//   title: 'Shopping Bag',
// },
// {
//   title: 'Orders',
// },
// ];
