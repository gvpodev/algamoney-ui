import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../core/error-handler.service';

export class PessoaFiltro {
  nome?: string
  pagina = 0
  itensPorPagina = 5
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDYzMTQzMzEsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJoZk9sdzhVN1JKZEtyeDJZaTJyNXRENW8yU2MiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.xcmk5_Qci-JBFLZ97c5iucml38jmfl8PDiJUFSjC1-0'

  pessoasUrl = 'http://localhost:8080/pessoas'

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina)

    const headers = new HttpHeaders()
      .append('Authorization', this.BEARER_TOKEN)

    if (filtro.nome) {
      params = params.set('nome', filtro.nome)
    }

    return this.http.get(`${this.pessoasUrl}`, { headers, params })
      .toPromise()
      .then((response: any) => {
        const responseJson = response
        const pessoas = responseJson.content

        const resultado = {
          pessoas,
          total: responseJson.totalElements
        }

        return resultado
      })
  }

  excluir(codigo: number) {
    const headers = new HttpHeaders()
      .append('Authorization', this.BEARER_TOKEN)

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then()
      .catch(err => {
        this.errorHandler.handle(err)
      })
  }

  atualizarStatus(codigo: number, status: boolean) {
    const headers = new HttpHeaders()
      .append('Authorization', this.BEARER_TOKEN)

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, status , { headers })
      .toPromise()
      .then()
      .catch(err => this.errorHandler.handle(err))
  }
}
