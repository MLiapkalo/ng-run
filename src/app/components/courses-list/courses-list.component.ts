import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../shared/interfaces/course';
import { ListOrdering } from '../../shared/enums/listOrdering';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input()
  list: Course[] = [];
  @Input()
  order: ListOrdering = ListOrdering.Desc;
  @Input()
  orderByKey: keyof Course = 'creationDate';
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
