import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ]

  categorias = []

  pessoas = [
    { label: 'Gabriel Vasconcellos', value: 1 },
    { label: 'Deco Pimentel', value: 2 },
    { label: 'Gb Oliveira', value: 3 }
  ]

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias()
  }

  carregarCategorias() {
    return this.categoriaService.listar()
      .then(categorias => {
        this.categorias = categorias.map((cat: any) => {
          return { label: cat.nome, value: cat.codigo }
        })
      })
      .catch(err => this.errorHandler.handle(err))
  }

}
