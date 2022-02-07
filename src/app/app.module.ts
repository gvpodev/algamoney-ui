// App modules
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';


// Components modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    LancamentosPesquisaComponent,
    NavbarComponent,
    PessoasPesquisaComponent
  ],
  imports: [
    // App
    BrowserModule,
    AppRoutingModule,

    // Prime NG
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt'},
    {  provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
