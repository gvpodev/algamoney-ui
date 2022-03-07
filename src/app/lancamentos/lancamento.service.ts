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

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao)
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
    { params })
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
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then()
      .catch(err => {
        this.errorHandler.handle(err)
      })
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento | undefined> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<Lancamento>
    (
      this.lancamentosUrl,
      lancamento,
      { headers }
    ).toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento | undefined> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers })
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then((response:any) => {
        this.converterStringsParaDatas([response]);
        return response;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      //Evita bug na hora da edição, adiciona o timezone do usuário
      let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento).getTime() + offset);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
    }
  }
}
