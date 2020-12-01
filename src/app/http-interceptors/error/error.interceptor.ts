import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((res: HttpErrorResponse) => {
          let errorMessage = '';
          if (res.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${res.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${res.status}, message: ${res.message}`;
          }
          return throwError(errorMessage);
        })
      );
  }
}
