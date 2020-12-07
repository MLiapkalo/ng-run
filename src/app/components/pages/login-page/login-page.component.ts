import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingStateService } from 'src/app/services/loading-state/loading-state.service';
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
    private authService: AuthService,
    private router: Router,
    private loadingStateService: LoadingStateService
  ) {}

  onLoginSubmit(): void {
    const { login, password } = this;
    this.loadingStateService.start();
    this.authService.login({ login, password }).subscribe(
        () => {
          this.loadingStateService.finish();
          this.router.navigateByUrl(this.authService.successLoginRedirect);
        },
        error => console.error(error)
    );
  }
}
