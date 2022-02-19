import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0
  filtro = new LancamentoFiltro()
  lancamentos = []
  @ViewChild('tabela') grid: any

  constructor(private lancamentoService: LancamentoService, private messagesService: MessageService) { }

  mudarPagina(event: LazyLoadEvent) {
    let pagina = 0
    if (event.first && event.rows) {
      pagina = event.first / event.rows
    }
    this.pesquisar(pagina)
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total
        this.lancamentos = resultado.lancamentos
      })
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.addSingle()
        this.grid.reset()
      })
  }

  addSingle() {
    this.messagesService.add({ severity: 'success', summary: 'Lançamento excluído', detail: 'O lançamento foi excluído com sucesso!' });
  }

  ngOnInit(): void {
  }
}
