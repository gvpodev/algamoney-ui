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
    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then((response: any) => response.content)
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina)

    if (filtro.nome) {
      params = params.set('nome', filtro.nome)
    }

    return this.http.get(`${this.pessoasUrl}`, { params })
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
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then()
      .catch(err => {
        this.errorHandler.handle(err)
      })
  }

  atualizarStatus(codigo: number, status: boolean) {
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, status )
      .toPromise()
      .then()
      .catch(err => this.errorHandler.handle(err))
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa | undefined> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<Pessoa>
    (
      this.pessoasUrl,
      pessoa,
      { headers }
    ).toPromise();
  }


  atualizar(pessoa: Pessoa): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')

      return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers })
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then((response:any) => {
        return response;
      });
  }
}
