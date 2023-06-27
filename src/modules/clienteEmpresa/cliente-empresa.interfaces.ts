export interface IClienteEmpresa {
  id?: string;
  clienteId: string;
  empresaId: string;
  diaVencimento: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IParamsCreateClientCompany {
  empresaId: string;
  diaVencimento: number;
  nome: string;
  cpf_cnpj: string;
  telefone: string;
  bairro: string;
  rua: string;
  numero: string;
}
