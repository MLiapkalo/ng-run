import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { selectors as fromCourses } from '../../../store/courses';
import { LoadingStateService } from '../../../services/loading-state/loading-state.service';
import { Store } from '@ngrx/store';
import { isLoggedIn } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnDestroy {
  constructor(
    private authService: AuthService,
    private loadingStateService: LoadingStateService,
    private store: Store
  ) {
    this.loadingStateService.observeFlag(this.store.select(fromCourses.getIsLoadingFlag));
  }

  get allowCreation(): Observable<boolean> {
    return this.store.select(isLoggedIn);
  }

  ngOnDestroy(): void {
    this.loadingStateService.leaveFlag();
  }
}
