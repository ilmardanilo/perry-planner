export interface IParamsCreateMovement {
  clienteId: string;
  empresaId: string;
  // contaId?: string;
  valor: number;
  tipo: ETypeMovement;
  descricao?: string;
}

export enum ETypeMovement {
  COMPRA = "COMPRA",
  PAGAMENTO = "PAGAMENTO"
}

export enum EMonth {
  JANEIRO = "JANEIRO",
  FEVEREIRO = "FEVEREIRO",
  MARCO = "MARCO",
  ABRIL = "ABRIL",
  MAIO = "MAIO",
  JUNHO = "JUNHO",
  JULHO = "JULHO",
  AGOSTO = "AGOSTO",
  SETEMBRO = "SETEMBRO",
  OUTUBRO = "OUTUBRO",
  NOVEMBRO = "NOVEMBRO",
  DEZEMBRO = "DEZEMBRO"
}
