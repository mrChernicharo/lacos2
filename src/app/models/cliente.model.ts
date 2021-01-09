export type IOrigem = 'clínica' | 'flamengo' | 'vale' | 'cpII';
export type IServerTimestamp = { seconds: number; nanoseconds: number };

export class Cliente {
  id?: string;
  nome: string;
  email?: string;
  telefone?: string;
  origem: IOrigem;
  endereco: string;
  dataCadastro: Date | IServerTimestamp;
  atualizadoEm: Date | IServerTimestamp;
  atendimentos: number;
}
