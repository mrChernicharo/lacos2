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
import { IServerTimestamp } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  consultasSubject$ = new BehaviorSubject<Consulta[]>([]);
  _consultas$ = this.consultasSubject$.asObservable();

  constructor(private db: DbService, public authService: AuthService) {}

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
        dataConsulta: {
          seconds: new Date(
            finalFormData.dataRelatorio.getFullYear(),
            finalFormData.dataRelatorio.getMonth(),
            finalFormData.dataRelatorio.getDate(),
            +item.horario.substr(0, 2),
            +item.horario.substr(3, 2),
            0
          ).getTime(),
          nanoseconds: 0,
        },
        dataCriacao: {
          seconds: finalFormData.dataCriacao.getTime(),
          nanoseconds: 0,
        },
        dataAtualizacao: {
          seconds: finalFormData.dataAtualizacao.getTime(),
          nanoseconds: 0,
        },
      };

      return newConsulta;
    });
    this.db.storeConsultas(newConsultas);
  }

  getConsultasSubjectLatestValue() {
    return this.consultasSubject$.getValue();
  }

  isBusyDay(date): boolean {
    const consultas = this.consultasSubject$.getValue();

    const foundConsultaOnDate = consultas.find(
      (consulta) =>
        new Date(
          (consulta.dataConsulta as IServerTimestamp).seconds
        ).toLocaleDateString('pt-BR') ===
        new Date(date).toLocaleDateString('pt-BR')
    );

    return !!foundConsultaOnDate;
  }

  getConsultasAmountInDay(date): number {
    const consultas = this.consultasSubject$.getValue();
    const total = consultas.filter(
      (consulta) =>
        new Date(
          (consulta.dataConsulta as IServerTimestamp).seconds
        ).toLocaleDateString() === new Date(date).toLocaleDateString()
      // ||
      // new Date(
      //   (consulta.dataConsulta as IServerTimestamp).seconds * 1000
      // ).toLocaleDateString() === new Date(date).toLocaleDateString()
    ).length;

    return total;
  }

  async updateConsultas(consultas: Consulta[], removedIds: string[]) {
    console.log(consultas);
    // console.log(removedIds);

    try {
      // TODO alterar consultas simplesmente editadas
      const editedConsultas = consultas.filter(
        (consulta) => consulta.idConsulta
      );
      // console.log('edit consultas:');
      // console.log(editedConsultas);

      // TODO criar id pras consultas adicionadas
      const addedConsultas = consultas.filter(
        (consulta) => !consulta.idConsulta
      );
      // console.log('add consultas:');
      // console.log(addedConsultas);

      // TODO deletar do banco consultas removidas no form
      if (removedIds.length > 0) {
        this.db.deleteConsultas(removedIds);
      }

      await this.db.updateConsultas(editedConsultas);
      await this.db.storeConsultas(addedConsultas);

      return 'OK!';
    } catch {
      console.log('deu ruim na atualização!');
      return 'Deu Ruim!';
    }
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
