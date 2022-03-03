import * as moment from "moment"

export class Pessoa {
  codigo?: number
}

export class Categoria {
  codigo?: number
}

export class Lancamento {
  codigo?: number
  tipo: string = 'RECEITA'
  descricao: string = ''
  dataVencimento: Date = new Date()
  dataPagamento?: Date
  valor: number = 0
  observacao?: string
  pessoa: Pessoa = new Pessoa()
  categoria: Categoria = new Categoria()
}
