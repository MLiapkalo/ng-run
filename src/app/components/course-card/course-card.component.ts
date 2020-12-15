import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../shared/interfaces/course';
import { Store } from '@ngrx/store';
import { isLoggedIn } from '../../store/auth/auth.selectors';

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
    private store: Store
  ) {}

  onDeleteClick(): void {
    this.delete.emit(this.course.id);
  }

  get allowModifying(): Observable<boolean> {
    return this.store.select(isLoggedIn);
  }
}
