import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent {
  searchTerm = '';

  constructor(
    private authService: AuthService
  ) {}

  get allowCreation(): boolean {
    return this.authService.isAuthenticated();
  }

  onSearchSubmit(term: string): void {
    this.searchTerm = term;
  }
}
