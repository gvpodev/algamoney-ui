import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messagesService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string

    if(typeof errorResponse === 'string') {
      msg = errorResponse
    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {

      msg = 'Ocorreu um erro ao processar sua solicitação'

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação.'
      }

      try {
        msg = errorResponse.error[0].mensagemUsuario
      } catch (error) {

      }
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente'
    }

    this.messagesService.add({
      severity: 'error',
      summary: 'Ops! Algo errado aconteceu!',
      detail: msg
    })
  }
}
