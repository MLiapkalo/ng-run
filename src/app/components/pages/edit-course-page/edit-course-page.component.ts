import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { CourseDTO } from 'src/app/shared/interfaces/course';
import { Observable } from 'rxjs';
import { courseToDTO } from '../../../mappers/course.mapper';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.scss']
})
export class EditCoursePageComponent implements OnInit {
  course$: Observable<CourseDTO>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.course$ = this.courseService.getById(id).pipe(map(courseToDTO));
    });
  }
}
