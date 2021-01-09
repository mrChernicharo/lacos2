import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

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
  NbActionsModule,
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
  NbStepperModule,
  NbTableModule,
  NbThemeModule,
} from '@nebular/theme';
import { CalendarFormComponent } from './profissional/home/novo-relatorio/calendar-form/calendar-form.component';
import { ReportFormComponent } from './profissional/home/novo-relatorio/report-form/report-form.component';

const nbModules = [
  NbEvaIconsModule,
  NbAccordionModule,
  NbActionsModule,
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
  NbStepperModule,
  NbTableModule,
  NbThemeModule,
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
    CalendarFormComponent,
    ReportFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    ...nbModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
