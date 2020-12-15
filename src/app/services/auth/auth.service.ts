import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, tap } from 'rxjs/operators';
import { Credentials } from '../../shared/interfaces/credentials';
import { ApiConfigService } from '../api-config/api-config.service';
import { TokenResponse } from '../../shared/interfaces/TokenResponse';
import { User, UserInfo } from '../../shared/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cfg: ApiConfigService
  ) {}


  private get AUTH_TOKEN_KEY(): string {
    return 'AUTH_TOKEN';
  }

  private get USER_INFO_KEY(): string {
    return 'USER_INFO_KEY';
  }

  get successLoginRedirect(): string {
    return '/courses';
  }

  get logoutRedirect(): string {
    return '/';
  }

  login(payload: Credentials): Observable<UserInfo> {
    return this.http.post(this.cfg.login(), payload).pipe(
      tap(this.saveToken),
      exhaustMap(this.fetchUserInfo),
      tap(this.saveUserInfo),
    );
  }

  fetchUserInfo = (): Observable<User> => {
    return this.http.get<User>(this.cfg.userInfo());
  }

  saveToken = ({ token }: TokenResponse): void => localStorage.setItem(this.AUTH_TOKEN_KEY, token);

  getToken = (): string | undefined => localStorage.getItem(this.AUTH_TOKEN_KEY);

  saveUserInfo = ({ id, name }: User): void => {
    localStorage.setItem(this.USER_INFO_KEY, JSON.stringify({ id, name }));
  }

  getUserInfo(): UserInfo {
    const userInfo = localStorage.getItem(this.USER_INFO_KEY);
    return userInfo ? JSON.parse(userInfo) : null;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.USER_INFO_KEY);
  }
}
