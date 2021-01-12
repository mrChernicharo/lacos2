import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientesComponent } from './admin/dashboard/add-clientes/add-clientes.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
// import { LoginComponent } from './auth/login/login.component';
// import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './profissional/home/home.component';
import { NovoRelatorioComponent } from './profissional/home/novo-relatorio/novo-relatorio.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'profissional',
    component: HomeComponent,
    children: [
      {
        path: 'novo-relatorio',
        component: NovoRelatorioComponent,
        // data: clientes
      },
    ],
  },
  {
    path: 'admin',
    component: DashboardComponent,
    children: [{ path: 'clientes', component: AddClientesComponent }],
  },
  { path: '**', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
