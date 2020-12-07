import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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

  get allowCreation(): Observable<boolean> {
    return this.authService.isAuthenticated();
  }

  onTermChange(term: string): void {
    this.searchTerm = term;
  }
}
