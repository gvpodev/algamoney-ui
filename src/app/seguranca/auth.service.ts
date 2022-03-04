import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token'

  constructor(private http: HttpClient) { }

  login(usuario: string, senha: string) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', environment.BASIC_AUTH)

    const body = `username=${usuario}&password=${senha}&grant_type=password`

    return this.http.post(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then(response => console.log(response))
      .catch(erro => console.log(erro))
  }
}
