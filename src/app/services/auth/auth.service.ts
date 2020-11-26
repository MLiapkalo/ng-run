import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../../shared/interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router
  ) { }

  private get AUTH_TOKEN_KEY() {
    return 'AUTH_TOKEN';
  }

  private get USER_INFO_KEY() {
    return 'USER_INFO_KEY';
  }

  login(payload: Credentials): void {
    localStorage.setItem(this.AUTH_TOKEN_KEY, 'fake auth token');
    localStorage.setItem(this.USER_INFO_KEY, JSON.stringify({ email: payload.email }));
    this.router.navigateByUrl('/courses');
  }

  logout(): void {
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
