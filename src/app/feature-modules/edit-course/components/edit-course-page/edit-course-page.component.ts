import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDTO } from 'src/app/shared/interfaces/Course';
import { LoadingStateService } from 'src/app/services/loading-state/loading-state.service';
import { Store } from '@ngrx/store';
import { getCourseById } from '../../../../store/courses/courses.selectors';
import * as fromCourseForm from '../../../course-form/store/course-form.selectors';
import { Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { courseToDTO } from '../../../../mappers/course.mapper';

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.scss']
})
export class EditCoursePageComponent implements OnInit, OnDestroy {
  course: CourseDTO;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private loadingStateService: LoadingStateService
  ) {}

  ngOnInit(): void {
    this.loadingStateService.observeFlag(
      this.store.select(fromCourseForm.getIsLoadingFlag)
    );

    this.route.params.pipe(
      first(),
      map(({ id }) => +id),
      switchMap(id => this.store.select(getCourseById, { id })),
    ).subscribe((course) => this.course = courseToDTO(course));
  }

  get isLoading(): Observable<boolean> {
    return this.loadingStateService.isLoading();
  }

  ngOnDestroy(): void {
    this.loadingStateService.leaveFlag();
  }
}
