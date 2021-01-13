import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente.model';
import { Consulta } from 'src/app/models/consulta.model';
import { AppUser, AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  clientes$: Observable<Cliente[]>;
  currentPage$: Observable<string>;
  // consultas$: Observable<Consulta[]>;
  user;
  consultas;
  clientes;
  // user$: Observable<AppUser>;

  constructor(
    private clientesService: ClientesService,
    private consultasService: ConsultasService,
    private headerService: HeaderService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.user = this.route.data['user'];
    // this.route.data.subscribe((value) => console.log(value));
    // this.route.data.subscribe((data) => console.log(data));
    console.log(this.router);
    console.log(this.route);
    console.log(this);

    // this.consultas$ = this.consultasService.consultas$;
    // this.user$ = this.authService.user$ as Observable<AppUser>;
    // this.user$.pipe(
    //   tap((user) => this.consultasService.fetchUserConsultas(user))
    // );

    this.currentPage$ = this.headerService.currentPage$.pipe(
      tap((page) => console.log(page))
    );
  }

  // onActivate(routerData, clientes: Cliente[]) {
  //   // routerData['clientes'] = clientes;
  //   // routerData['user'] = this.user;
  // }

  // onDeactivate(routerData) {
  //   console.log(routerData);
  // }
}
