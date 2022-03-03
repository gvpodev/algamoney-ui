export class Endereco {
  logradouro: string = ''
  numero: string = ''
  complemento: string = ''
  bairro: string = ''
  cep: string = ''
  cidade: string = ''
  estado: string = ''
}

export class Pessoa {
  codigo?: number
  nome: string = ''
  endereco = new Endereco();
  ativo = true;
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
