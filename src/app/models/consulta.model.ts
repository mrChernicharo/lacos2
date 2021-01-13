import { IServerTimestamp } from './cliente.model';

export class Consulta {
  constructor(
    public horario: string,
    public nomeProfissional: string,
    public idProfissional: string,
    public nomePaciente: string,
    public idPaciente: string,
    public origem: string,
    public modalidade: 'presencial' | 'online' | 'externa',
    public dataConsulta: Date | IServerTimestamp,
    public dataCriacao: Date | IServerTimestamp,
    public dataAtualizacao: Date | IServerTimestamp,
    public idConsulta?: string
  ) {}
}
