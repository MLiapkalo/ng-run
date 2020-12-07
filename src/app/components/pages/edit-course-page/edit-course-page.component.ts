import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { CourseDTO } from 'src/app/shared/interfaces/course';
import { Observable } from 'rxjs';
import { courseToDTO } from '../../../mappers/course.mapper';
import { map } from 'rxjs/operators';
import { LoadingStateService } from 'src/app/services/loading-state/loading-state.service';

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.scss']
})
export class EditCoursePageComponent implements OnInit {
  course: CourseDTO;

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private loadingStateService: LoadingStateService
  ) {}

  private fetchCourse(id: string) {
    this.courseService.getById(id).pipe(map(courseToDTO)).subscribe(course => {
      this.course = course;
      this.loadingStateService.finish();
    });
  }

  get isLoading(): Observable<boolean> {
    return this.loadingStateService.isLoading();
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.loadingStateService.start();
      this.fetchCourse(id);
    });
  }
}
