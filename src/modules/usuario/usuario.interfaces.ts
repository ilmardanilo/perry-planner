export interface IUsuario {
  id?: string;
  nome: string;
  email?: string;
  senha?: string;
  telefone: string;
  bairro: string;
  rua: string;
  numero: string;
  cpf_cnpj: string;
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
  cpf_cnpj: string;
}

export interface IParamsUpdateUser {
  nome?: string;
  telefone?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  cpf_cnpj?: string;
}
