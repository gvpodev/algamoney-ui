import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

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
  pessoas = []
  lancamento = new Lancamento()

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messagesService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const codigoLancamento = this.route.snapshot.params['codigo']

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento)
    }

    this.carregarCategorias()
    this.carregarPessoas()
  }

  get editando() {
    return Boolean(this.lancamento.codigo)
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento
      })
      .catch(err => this.errorHandler.handle(err))
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

  carregarPessoas() {
    return this.pessoaService.listar()
      .then(pessoas => {
        this.pessoas = pessoas.map((p: any) => {
          return { label: p.nome, value: p.codigo }
        })
      })
  }

  salvar(lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.messagesService.add({ severity: 'success', summary: 'Lançamento cadastrado', detail: 'O lançamento foi cadastrado com sucesso!' });

        lancamentoForm.reset()
        this.lancamento = new Lancamento()
      })
      .catch(err => this.errorHandler.handle(err))
  }

}
