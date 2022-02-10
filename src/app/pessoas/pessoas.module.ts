import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PessoaCadastroComponent } from './pessoas-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasTabelaComponent } from './pessoas-tabela/pessoas-tabela.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';




@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    PessoasTabelaComponent
  ],
  exports: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule
  ]
})
export class PessoasModule { }
