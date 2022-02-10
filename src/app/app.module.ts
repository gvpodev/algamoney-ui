// App modules
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

// Components modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { ErrorMessagesComponent } from './shared/error-messages/error-messages.component';
import { PessoasModule } from './pessoas/pessoas.module';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';



registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ErrorMessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    LancamentosModule,
    PessoasModule,

    MessageModule,
    MessagesModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
