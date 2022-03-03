import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias'

  constructor(private http: HttpClient) { }

  listar(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', environment.BEARER_TOKEN)

    return this.http.get(this.categoriasUrl, { headers })
      .toPromise()
      .then((response: any) => {
        return response
      })
  }
}
