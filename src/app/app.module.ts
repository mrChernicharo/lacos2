import {
  COMPILER_OPTIONS,
  CUSTOM_ELEMENTS_SCHEMA,
  LOCALE_ID,
  NgModule,
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

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
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbToastrModule,

  // NbNativeDateService,
  NbOptionModule,
  NbSelectModule,
  NbStepperModule,
  NbTableModule,
  NbThemeModule,
  NB_TIME_PICKER_CONFIG,
} from '@nebular/theme';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// import { } from '@angular/material/t'

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClienteCardComponent } from './shared/cliente-card/cliente-card.component';
import { CustomDayCellComponent } from './shared/custom-day-cell/custom-day-cell.component';
import { EditRelatorioComponent } from './profissional/home/edit-relatorio/edit-relatorio.component';

registerLocaleData(localePt);

const nbModules = [
  NbEvaIconsModule,
  NbAccordionModule,
  NbActionsModule,
  NbButtonModule,
  NbCalendarModule,
  NbCardModule,
  NbContextMenuModule,
  NbDatepickerModule,
  // NbNativeDateService,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbOptionModule,
  NbSelectModule,
  NbStepperModule,
  NbTableModule,
  NbThemeModule,
];

const matModules = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatSnackBarModule,
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
    LoginComponent,
    SignupComponent,
    ClienteCardComponent,
    CustomDayCellComponent,
    EditRelatorioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbMenuModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebaseConfig),
    ...nbModules,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    // { provide: NB_TIME_PICKER_CONFIG, useValue: {} },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
