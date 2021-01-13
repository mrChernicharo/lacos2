export type IOrigem = 'clínica' | 'flamengo' | 'vale' | 'cpII';

export type IServerTimestamp = { seconds: number; nanoseconds: number };

export class Cliente {
  constructor(
    public nome: string,
    public origem: IOrigem,
    public endereco: string,
    public dataCadastro: Date | IServerTimestamp,
    public atualizadoEm: Date | IServerTimestamp,
    public atendimentos: number,
    public id?: string,
    public email?: string,
    public telefone?: string
  ) {}
}
