import { Component, OnInit } from '@angular/core';
import { Course } from '../../shared/interfaces/course';
import COURSES_MOCK from '../../shared/mocks/courses.mock';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];

  ngOnInit(): void {
    this.courses = COURSES_MOCK;
  }

  editCourse(id: string): void {
    console.log(`Edit course: ${id}`);
  }

  deleteCourse(id: string): void {
    this.courses = this.courses.filter(({ id: courseId }) => courseId !== id);
  }
}
