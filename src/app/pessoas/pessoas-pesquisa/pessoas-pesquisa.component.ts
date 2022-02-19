import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
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

  constructor(private pessoaService: PessoaService) { }

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

  ngOnInit(): void {
  }

}
