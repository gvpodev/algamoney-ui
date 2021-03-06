import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, mergeMap, Observable } from "rxjs";
import { AuthService } from "./auth.service";

export class NotAuthorizedError {}

@Injectable()
export class MoneyHttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {
      return from(this.auth.novoAccessToken())
        .pipe(
          mergeMap(() => {
            if (this.auth.isAccessTokenInvalido()) {
              throw new NotAuthorizedError()
            }
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            return next.handle(req)
          })
        )
    }

    return next.handle(req)
  }
}
