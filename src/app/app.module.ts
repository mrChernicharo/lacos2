import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './structure/header/header.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './profissional/home/home.component';
import { NovoRelatorioComponent } from './profissional/home/novo-relatorio/novo-relatorio.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddClientesComponent } from './admin/dashboard/add-clientes/add-clientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCalendarModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbOptionModule,
  NbSelectModule,
  NbTableModule,
  NbThemeModule,
} from '@nebular/theme';

const nbModules = [
  NbLayoutModule,
  NbEvaIconsModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbButtonModule,
  NbDatepickerModule,
  NbCalendarModule,
  NbSelectModule,
  NbAccordionModule,
  NbDialogModule,
  NbTableModule,
  NbOptionModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    HomeComponent,
    NovoRelatorioComponent,
    DashboardComponent,
    AddClientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    ...nbModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
