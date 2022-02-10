import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [
    { nome: 'Gabriel Vasconcellos', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true },
    { nome: 'Cintia Alves', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true },
    { nome: 'Deco Pimentel', cidade: 'Niteroi', estado: 'RJ', ativo: false },
    { nome: 'Ilmacy Mello', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true },
    { nome: 'Zé das Couves', cidade: 'São Paulo', estado: 'SP', ativo: true },
    { nome: 'Fulado Beltrano', cidade: 'Belo Horizonte', estado: 'MG', ativo: false },
    { nome: 'Casimito Miguel', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: false },
    { nome: 'Lucas Coelho', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true },
    { nome: 'Marcos Felipe', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true },
    { nome: 'Neymar Junior', cidade: 'Santos', estado: 'SP', ativo: false },
    { nome: 'Lionel Messi', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
