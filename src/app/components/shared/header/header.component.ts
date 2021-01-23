import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { appIcons } from '../../../../assets/app-icons';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import {
  NbContextMenuDirective,
  NbMenuItem,
  NbMenuService,
  NB_WINDOW,
} from '@nebular/theme';
import { HeaderService } from 'src/app/services/header.service';
import { AppUser, AuthService } from 'src/app/services/auth.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ClientesService } from 'src/app/services/clientes.service';

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
  user$: Observable<AppUser>;

  menuItems = [];

  constructor(
    private router: Router,
    private nbMenuService: NbMenuService,
    private headerService: HeaderService,
    private authService: AuthService, // private menuService: NbMenuService, // private activatedRoute: ActivatedRoute // private routeSnapshot: ActivatedRouteSnapshot
    private consultasService: ConsultasService,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.routerState$ = this.headerService.currentPage$.pipe(
      tap(page => {
        this.menuItems.length = 0; // reset menu items array
        // reposition them according to page
        switch (page) {
          case 'profissional':
            this.menuItems.push({ title: 'novo relatorio' }, { title: 'logoff' });
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
          default:
            this.menuItems.push({ title: 'logoff' });
        }
      })
    );

    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'context-menu'),
        map(({ item: { title } }) => title)
      )
      .subscribe(title => this.goToPage(title));
  }

  goToPage(page: string) {
    console.log(page);
    switch (page) {
      case 'novo relatorio':
        return this.router.navigate(['profissional', 'novo-relatorio']);

      // case 'edit relatorio':
      //   return this.router.navigate(['profissional', 'edit-relatorio']);

      case 'clientes':
        return this.router.navigate(['admin', 'clientes']);

      case 'home':
        return this.router.navigate(['profissional']);

      case 'dashboard':
        return this.router.navigate(['admin']);

      case 'logoff':
        this.clientesService._destroy();
        this.consultasService._destroy();
        this.authService.signOut();
      // return this.router.navigate(['auth']);
    }
  }
}
