import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDYzMTQzMzEsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJoZk9sdzhVN1JKZEtyeDJZaTJyNXRENW8yU2MiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.xcmk5_Qci-JBFLZ97c5iucml38jmfl8PDiJUFSjC1-0'

  categoriasUrl = 'http://localhost:8080/categorias'

  constructor(private http: HttpClient) { }

  listar(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', this.BEARER_TOKEN)

    return this.http.get(this.categoriasUrl, { headers })
      .toPromise()
      .then((response: any) => {
        return response
      })
  }
}
