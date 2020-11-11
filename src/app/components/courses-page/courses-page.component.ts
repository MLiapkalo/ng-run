import { Component, OnInit } from '@angular/core';
import { Course } from '../../shared/interfaces/course';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
  }

  editCourse(id: string): void {
    console.log(`Edit course: ${id}`);
  }

  deleteCourse(id: string): void {
    if (confirm('Do you really want to delete this course?')) {
      this.coursesService.deleteById(id);
      this.courses = this.coursesService.getList();
    }
  }

  findCourseByTitle(term: string): void {
    this.courses = term
      ? this.coursesService.getByTitle(term)
      : this.coursesService.getList();
  }
}
