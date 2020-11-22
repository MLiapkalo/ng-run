import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges
} from '@angular/core';
import { Course } from '../../shared/interfaces/course';
import { ListOrdering } from '../../shared/enums/listOrdering';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnChanges {
  @Input()
  searchTerm = '';
  @Input()
  order: ListOrdering = ListOrdering.Desc;
  @Input()
  orderByKey: keyof Course = 'creationDate';

  list: Course[] = [];

  constructor(
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.list = this.coursesService.getList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('searchTerm')) {
      this.findCourseByTitle(this.searchTerm);
    }
  }

  deleteCourse(id: string): void {
    if (confirm('Do you really want to delete this course?')) {
      this.coursesService.deleteById(id);
      this.list = this.coursesService.getList();
    }
  }

  findCourseByTitle(term: string): void {
    this.list = term
      ? this.coursesService.getByTitle(term)
      : this.coursesService.getList();
  }

  onLoadMore(): void {
    console.log('Load more');
  }
}
