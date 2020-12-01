import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  login = '';
  password = '';

  constructor(
    private authService: AuthService
  ) {}

  onLoginSubmit(): void {
    console.log('LoginPageComponent: submit');
    const { login, password } = this;
    this.authService.login({ login, password });
  }
}
