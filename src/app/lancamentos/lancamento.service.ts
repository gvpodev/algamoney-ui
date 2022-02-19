import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

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

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina)

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDUyNDIyMDAsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJjVjRMVDR3ZEVoS1J1cHl3NWJvZ253eFJRbDQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.AYkDfRU1gSsoxSbIgc3ic0Aqs7D2-xjVscQyV7zTw2o')

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
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDUyNDIyMDAsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJjVjRMVDR3ZEVoS1J1cHl3NWJvZ253eFJRbDQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.AYkDfRU1gSsoxSbIgc3ic0Aqs7D2-xjVscQyV7zTw2o')

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then()
  }
}
