import { ErrorInterceptor } from './error/error.interceptor';
import { AuthTokenInterceptor } from './auth-token/auth-token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export default [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true
  },
];
