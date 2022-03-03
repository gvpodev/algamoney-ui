import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
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

  constructor(
    private lancamentoService: LancamentoService,
    private messagesService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

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

  confirmaExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Deseja mesmo excluír esse lançamento?',
      accept: () => {
        this.excluir(lancamento)
      }
    })
  }

  addSingle() {
    this.messagesService.add({ severity: 'success', summary: 'Lançamento excluído', detail: 'O lançamento foi excluído com sucesso!' });
  }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de lançamentos')
  }
}
