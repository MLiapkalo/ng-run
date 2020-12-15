import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from '../../../services/courses/courses.service';
import { Store } from '@ngrx/store';
import * as types from './course-form.types';
import * as actions from './course-form.actions';
import { catchError, concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { getUserFullName, getUserId } from '../../../store/auth/auth.selectors';
import { CourseDTO } from '../../../shared/interfaces/Course';


@Injectable()
export class CourseFormEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private store: Store
  ) {}

  addCourse$ = createEffect(() => this.actions$.pipe(
    ofType(types.AddCourse),
    concatMap(({ data }) => of(data as CourseDTO).pipe(
      // append current user as an author
      withLatestFrom(
        this.store.select(getUserId),
        this.store.select(getUserFullName),
        (actionData, userId, userFullName) => ({
          ...actionData,
          authors: [...actionData.authors, { id: userId, name: userFullName }]
        })
      )
    )),
    switchMap(data => this.coursesService.createCourse(data).pipe(
      tap(({ title }) => alert(`Successfully created course "${title}"`)),
      map(() => actions.addCourseSuccess()),
      catchError(() => of(actions.addCourseFailure()))
    ))
  ));

  editCourse$ = createEffect(() => this.actions$.pipe(
    ofType(types.EditCourse),
    switchMap(({ data }) => this.coursesService.updateById(data).pipe(
      tap(({ title }) => alert(`Successfully updated course "${title}"`)),
      map(() => actions.editCourseSuccess()),
      catchError(() => of(actions.editCourseFailure()))
    ))
  ));
}
