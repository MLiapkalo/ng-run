import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth/auth.service';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as types from './auth.types';
import * as actions from './auth.actions';
import { Router } from '@angular/router';



@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(types.LoginRequest),
    exhaustMap(({ data: credentials }) => this.authService.login(credentials).pipe(
      map(({ id, name }) => actions.setUserInfo({ data: { id, name } })),
      tap(() => this.router.navigateByUrl(this.authService.successLoginRedirect)),
      catchError(() => of(actions.loginRequestFailure())
    ))),
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(types.Logout),
    tap(() => {
      this.authService.logout();
      this.router.navigateByUrl(this.authService.logoutRedirect);
    })
  ), { dispatch: false });

  checkForUserInfo$ = createEffect(() => this.actions$.pipe(
    ofType(types.CheckForUserInfo),
    map(() => this.authService.getUserInfo()),
    map(user => actions.setUserInfo({ data: user }))
  ));
}
