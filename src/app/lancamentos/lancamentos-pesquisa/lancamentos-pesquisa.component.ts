import { Component, OnInit } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  descricao = ''
  dataVencimentoInicio?: Date
  dataVencimentoFim?: Date
  lancamentos = []

  constructor(private lancamentoService: LancamentoService) { }

  pesquisar() {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    }

    this.lancamentoService.pesquisar(filtro)
      .then(lancamentos => this.lancamentos = lancamentos)
  }

  ngOnInit(): void {
    this.pesquisar()
  }
}
