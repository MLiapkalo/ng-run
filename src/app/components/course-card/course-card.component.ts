import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../shared/interfaces/course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input()
  course: Course;
  @Output()
  delete = new EventEmitter<string>();
  @Output()
  edit = new EventEmitter<string>();

  onEditClick(): void {
    this.edit.emit(this.course.id);
  }

  onDeleteClick(): void {
    this.delete.emit(this.course.id);
  }
}
