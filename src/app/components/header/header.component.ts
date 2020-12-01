import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserInfo } from '../../shared/interfaces/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get isAuthenticated(): Observable<boolean> {
    return this.authService.isAuthenticated();
  }

  get userFullName(): string {
    const userInfo: UserInfo = this.authService.getUserInfo();
    return userInfo?.name ? `${userInfo.name.first} ${userInfo.name.last}` : '';
  }

  doLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
