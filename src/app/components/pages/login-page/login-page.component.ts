import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingStateService } from '../../../services/loading-state/loading-state.service';
import { Store } from '@ngrx/store';
import { selectors } from '../../../store/auth';
import { requestLogin, resetFlags } from '../../../store/auth/auth.actions';
import { Observable, Subject } from 'rxjs';
import { getLoginErrorFlag } from '../../../store/auth/auth.selectors';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private loginError: Observable<boolean> = this.store.select(getLoginErrorFlag);

  constructor(
    private store: Store,
    private loadingStateService: LoadingStateService
  ) {
    this.loadingStateService.observeFlag(this.store.select(selectors.getIsLoadingFlag));
  }

  ngOnInit(): void {
    this.loginError.pipe(
      takeUntil(this.destroy$)
    ).subscribe(isError => {
      if (isError) alert('Error while logging you in');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.store.dispatch(resetFlags());
    this.loadingStateService.leaveFlag();
  }

  onLoginSubmit(): void {
    this.store.dispatch(requestLogin({ data: this.loginForm.value }));
  }
}
