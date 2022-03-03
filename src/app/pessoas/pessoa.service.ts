import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../core/error-handler.service';
import { Pessoa } from '../core/model';

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

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  listar() {
    const headers = new HttpHeaders()
      .append('Authorization', environment.BEARER_TOKEN)

    return this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then((response: any) => response.content)
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina)

    const headers = new HttpHeaders()
      .append('Authorization', environment.BEARER_TOKEN)

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
      .append('Authorization', environment.BEARER_TOKEN)

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then()
      .catch(err => {
        this.errorHandler.handle(err)
      })
  }

  atualizarStatus(codigo: number, status: boolean) {
    const headers = new HttpHeaders()
      .append('Authorization', environment.BEARER_TOKEN)

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, status , { headers })
      .toPromise()
      .then()
      .catch(err => this.errorHandler.handle(err))
  }


  adicionar(pessoa: Pessoa): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', environment.BEARER_TOKEN)
      .append('Content-Type', 'application/json')

    return this.http.post(this.pessoasUrl, pessoa, { headers })
      .toPromise()
      .then(response => response);
  }
}
