import { Injectable } from '@angular/core';
import { Consulta } from '../models/consulta.model';
import { AppUser, AuthService } from './auth.service';
import { DbService } from './db.service';
import {
  IReportForm,
  IReportFormConsulta,
} from 'src/app/profissional/home/novo-relatorio/novo-relatorio.component';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  consultasSubject$ = new BehaviorSubject<Consulta[]>([]);
  _consultas$ = this.consultasSubject$.asObservable();

  constructor(private db: DbService, public authService: AuthService) {}

  saveConsultas(finalFormData: IReportForm, user: AppUser) {
    const newConsultas = finalFormData.consultas.map((item) => {
      const newConsulta: Consulta = {
        nomeProfissional: user.nome,
        idProfissional: user.id,
        idConsulta: '',
        idPaciente: item.idPaciente,
        nomePaciente: item.nomePaciente,
        origem: item.origem,
        horario: item.horario,
        modalidade: item.modalidade,
        dataConsulta: new Date(
          finalFormData.dataRelatorio.getFullYear(),
          finalFormData.dataRelatorio.getMonth(),
          finalFormData.dataRelatorio.getDate(),
          +item.horario.substr(0, 2),
          +item.horario.substr(3, 2),
          0
        ),
        dataCriacao: finalFormData.dataCriacao,
        dataAtualizacao: finalFormData.dataAtualizacao,
      };

      return newConsulta;
    });
    this.db.storeConsultas(newConsultas);
  }

  fetchUserConsultas(userData: AppUser) {
    console.log(userData);
    // console.log('FETCH USER CONSULTAS');
    return userData.role === 'admin'
      ? this.db
          .fetchAllConsultas()
          .pipe(tap((data) => this.consultasSubject$.next(data)))
      : this.db
          .fetchUserConsultas(userData.id)
          .pipe(tap((data) => this.consultasSubject$.next(data)));
  }

  getConsultasSubjectLatestValue() {
    return this.consultasSubject$.getValue();
  }

  _destroy() {
    this.consultasSubject$.next([]);
  }
}
export const MODALIDADES: string[] = ['online', 'presencial', 'externa'];
export const HORARIOS: string[] = [
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
];
