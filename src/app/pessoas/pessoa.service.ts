import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome?: string
  pagina = 0
  itensPorPagina = 5
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas'

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina)

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDUyNDExMDUsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJzQmRTUjRGRGNhbEw1WDV5dVJhYWZYekxxcG8iLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.4tM-RHLhb1Y3iXSzX_jSxNiOoRJ0OAinOwEbUldHamc')

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
}
