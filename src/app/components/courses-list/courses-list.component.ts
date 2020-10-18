import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../shared/interfaces/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input()
  list: Course[] = [];
  @Output()
  delete = new EventEmitter<string>();
  @Output()
  edit = new EventEmitter<string>();

  onLoadMore(): void {
    console.log('Load more');
  }

  onCourseDelete(id: string): void {
    this.delete.emit(id);
  }

  onCourseEdit(id: string): void {
    this.edit.emit(id);
  }
}
