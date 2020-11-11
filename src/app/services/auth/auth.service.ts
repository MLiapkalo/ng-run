import { Injectable } from '@angular/core';
import { Credentials } from '../../shared/interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  private get AUTH_TOKEN_KEY() {
    return 'AUTH_TOKEN';
  }

  private get USER_INFO_KEY() {
    return 'USER_INFO_KEY';
  }

  login(payload: Credentials): void {
    console.log('AuthService: login');
    localStorage.setItem(this.AUTH_TOKEN_KEY, 'fake auth token');
    localStorage.setItem(this.USER_INFO_KEY, JSON.stringify({ email: payload.email }));
  }

  logout(): void {
    console.log('AuthService: logout');
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.USER_INFO_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  getUserInfo(): any {
    const info = localStorage.getItem(this.USER_INFO_KEY);
    return info ? JSON.parse(info) : info;
  }
}
