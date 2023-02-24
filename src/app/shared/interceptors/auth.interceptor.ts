import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {UserService} from "../services/user/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;

  constructor(private userService: UserService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    let token = localStorage.getItem('access_token')

    if (token && !request.url.match("jwt")) {
      authReq = this.addTokenHeader(authReq, token);
    }

    return next.handle(authReq).pipe(catchError((err) => {
      if (err.status === 401) {
        return this.handle401Error(authReq, next);
      }

      return throwError(err);
    }));
  }

  private addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({setHeaders: {'Authorization': `OAuth ${token}`}});
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      let token = localStorage.getItem('refresh_token');

      if (token) {
        return this.userService.refreshToken(token).pipe(
          switchMap(() => {
            this.isRefreshing = false;

            return next.handle(request);
          }),
          catchError((error) => {
              this.isRefreshing = false;

              if (error.status == '403') {
                this.userService.logout();
              }

              return throwError(() => error);
            }
          )
        )
      }
    }

    return next.handle(request);
  }
}
  export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
