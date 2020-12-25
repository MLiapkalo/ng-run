import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions as coursesActions } from '../../../../store/courses';
import { selectors as fromRouter } from '../../../../store/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.scss']
})
export class EditCoursePageComponent implements OnInit {
  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.select(fromRouter.getParams).pipe(
      map(({ id }) => +id),
      filter(id => !isNaN(id))
    ).subscribe(id => this.store.dispatch(
      coursesActions.loadSingleCourse({ id, useAsFormPrefill: true })
    ))
  }
}
