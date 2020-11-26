import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
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
  delete = new EventEmitter<string>();

  constructor(
    private authService: AuthService
  ) {}

  onDeleteClick(): void {
    this.delete.emit(this.course.id);
  }

  get allowModifying(): boolean {
    return this.authService.isAuthenticated();
  }
}
