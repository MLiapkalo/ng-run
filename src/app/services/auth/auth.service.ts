import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { exhaustMap, map, tap} from 'rxjs/operators';
import { Credentials } from '../../shared/interfaces/credentials';
import { ApiConfigService } from '../api-config/api-config.service';
import { TokenResponse } from '../../shared/interfaces/TokenResponse';
import { User, UserInfo } from '../../shared/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private cfg: ApiConfigService
  ) {}

  private authSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.getToken());

  private get AUTH_TOKEN_KEY(): string {
    return 'AUTH_TOKEN';
  }

  private get USER_INFO_KEY(): string {
    return 'USER_INFO_KEY';
  }

  private get postLoginRedirect(): string {
    return '/courses';
  }

  login(payload: Credentials): void {
    this.http.post(this.cfg.login(), payload).pipe(
      tap(this.saveToken),
      exhaustMap(this.fetchUserInfo),
      map(this.saveUserInfo)
    ).subscribe(
      () => this.router.navigateByUrl(this.postLoginRedirect),
      error => console.error(error)
    );
  }

  fetchUserInfo = (): Observable<User> => {
    return this.http.get<User>(this.cfg.userInfo());
  }

  saveToken = ({ token }: TokenResponse): void => {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
    this.authSubj.next(true);
  }

  getToken(): string | undefined {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

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
    this.authSubj.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authSubj.asObservable();
  }
}
