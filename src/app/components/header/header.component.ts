import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { isLoggedIn, getUserFullName } from '../../store/auth/auth.selectors';
import { logout } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private store: Store
  ) {}

  get isAuthenticated(): Observable<boolean> {
    return this.store.select(isLoggedIn);
  }

  get userFullName(): Observable<string> {
    return this.store.select(getUserFullName);
  }

  doLogout(): void {
    this.store.dispatch(logout());
  }
}
