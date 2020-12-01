import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { Course } from '../../shared/interfaces/course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent {
  @Input()
  course: Course;
  @Output()
  delete = new EventEmitter<number>();

  constructor(
    private authService: AuthService
  ) {}

  onDeleteClick(): void {
    this.delete.emit(this.course.id);
  }

  get allowModifying(): Observable<boolean> {
    return this.authService.isAuthenticated();
  }
}
