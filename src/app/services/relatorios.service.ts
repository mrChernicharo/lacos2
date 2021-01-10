import { Injectable } from '@angular/core';
import { Consulta } from '../models/consulta.model';

export interface IReportForm {
  consultas: Partial<Consulta[]>;
  dataRelatorio: Date;
  dataAtualizacao: Date;
  dataCriacao: Date;
}

@Injectable({
  providedIn: 'root',
})
export class RelatoriosService {
  constructor() {}
}
