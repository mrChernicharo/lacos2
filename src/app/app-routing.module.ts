import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientesComponent } from './components/admin/dashboard/add-clientes/add-clientes.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
// import { LoginComponent } from './auth/login/login.component';
// import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './components/profissional/home/home.component';
import { NovoRelatorioComponent } from './components/profissional/home/novo-relatorio/novo-relatorio.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { EditRelatorioComponent } from './components/profissional/home/edit-relatorio/edit-relatorio.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'profissional',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'novo-relatorio',
        component: NovoRelatorioComponent,
        // data: clientes
      },
      // {
      //   path: 'edit-relatorio',
      //   component: EditRelatorioComponent,
      // },
    ],
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [{ path: 'clientes', component: AddClientesComponent }],
  },
  { path: '**', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
