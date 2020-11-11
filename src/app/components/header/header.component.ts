import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private authService: AuthService
  ) {}

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  get userEmail(): string {
    const userInfo = this.authService.getUserInfo();
    return userInfo?.email;
  }

  doLogout() {
    console.log('HeaderComponent: logout');
    this.authService.logout();
  }
}
