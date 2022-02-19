// App modules
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import ptBr from '@angular/common/locales/pt';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

// Components modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastModule,

    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
