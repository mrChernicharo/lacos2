import {
  COMPILER_OPTIONS,
  CUSTOM_ELEMENTS_SCHEMA,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/profissional/home/home.component';
import { NovoRelatorioComponent } from './components/profissional/home/novo-relatorio/novo-relatorio.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AddClientesComponent } from './components/admin/dashboard/add-clientes/add-clientes.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ClienteCardComponent } from './components/shared/cliente-card/cliente-card.component';
import { CustomDayCellComponent } from './components/shared/custom-day-cell/custom-day-cell.component';
import { EditRelatorioComponent } from './components/profissional/home/edit-relatorio/edit-relatorio.component';
import { SignupComponent } from './components/auth/signup/signup.component';

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
  NbOptionModule,
  NbSelectModule,
  NbStepperModule,
  NbTableModule,
  NbThemeModule,
  // NbNativeDateService,
  // NB_TIME_PICKER_CONFIG,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { } from '@angular/material/t'

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
    NbToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    // NgxAuthFirebaseUIModule.forRoot(environment.firebaseConfig),
    ...nbModules,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    // { provide: NB_TIME_PICKER_CONFIG, useValue: {} },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
