import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  totalRegistros = 0
  filtro = new PessoaFiltro()
  pessoas = []
  @ViewChild('tabela') grid: any

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService
  ) { }

  mudarPagina(event: LazyLoadEvent) {
    let pagina = 0

    if(event.first && event.rows) {
      pagina = event.first / event.rows
    }

    this.pesquisar(pagina)
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total
        this.pessoas = resultado.pessoas
      })
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Deseja mesmo excluir essa pessoa?',
      accept: () => {
        this.excluir(pessoa)
      }
    })
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.addSingle()
        this.grid.reset()
      })
  }

  atualizarStatus(pessoa: any){
    const novoStatus = !pessoa.ativo

    this.pessoaService.atualizarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        this.confirmStatusChange()
        this.grid.reset()
      })
  }

  confirmStatusChange() {
    this.messageService.add({ severity: 'success', summary: 'Status alterado', detail: 'Status alterado com sucesso!' })
  }

  addSingle() {
    this.messageService.add({ severity: 'success', summary: 'Pessoa excluída', detail: 'Pessoa excluída com sucesso!' })
  }

  ngOnInit(): void {
  }

}
