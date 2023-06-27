export interface IUsuario {
  id?: string;
  nome: string;
  email?: string;
  senha?: string;
  telefone: string;
  bairro: string;
  rua: string;
  numero: string;
  cpj_cnpj: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IParamsCreateUser {
  nome: string;
  email?: string;
  senha?: string;
  telefone: string;
  bairro: string;
  rua: string;
  numero: string;
  cpj_cnpj: string;
}
