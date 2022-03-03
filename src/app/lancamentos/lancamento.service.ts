import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../core/error-handler.service';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao?: string
  dataVencimentoInicio?: Date
  dataVencimentoFim?: Date
  pagina = 0
  itensPorPagina = 5
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos'

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina)

    const headers = new HttpHeaders()
      .append('Authorization', environment.BEARER_TOKEN)

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao)
      console.log(params)
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'))
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'))
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`,
    { headers, params })
      .toPromise()
      .then((response: any) => {
        const responseJson = response
        const lancamentos = responseJson.content

        const resultado = {
          lancamentos,
          total: responseJson.totalElements
        }

        return resultado
      })
      .catch(err => {
        this.errorHandler.handle(err)
      })
  }

  excluir(codigo: number) {
    const headers = new HttpHeaders()
      .append('Authorization', environment.BEARER_TOKEN)

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then()
      .catch(err => {
        this.errorHandler.handle(err)
      })
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento | undefined> {
    const headers = new HttpHeaders()
      .append('Authorization', environment.BEARER_TOKEN)
      .append('Content-Type', 'application/json');

    return this.http.post<Lancamento>
    (
      this.lancamentosUrl,
      lancamento,
      { headers }
    ).toPromise();
  }
}
