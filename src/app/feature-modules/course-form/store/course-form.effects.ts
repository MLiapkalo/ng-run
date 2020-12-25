import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from '../../../services/courses/courses.service';
import * as types from './course-form.types';
import { types as coursesTypes } from '../../../store/courses';
import * as actions from './course-form.actions';
import { 
  catchError,
  filter,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthorsService } from '../../../services/authors.service';
import { courseToDTO } from '../../../mappers/course.mapper';

@Injectable()
export class CourseFormEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private authorsService: AuthorsService
  ) {}

  addCourse$ = createEffect(() => this.actions$.pipe(
    ofType(types.AddCourse),
    map(courseToDTO),
    switchMap(data => this.coursesService.createCourse(data).pipe(
      tap(({ title }) => alert(`Successfully created course "${title}"`)),
      map(() => actions.addCourseSuccess()),
      catchError(() => of(actions.addCourseFailure()))
    ))
  ));

  editCourse$ = createEffect(() => this.actions$.pipe(
    ofType(types.EditCourse),
    map(({ data }) => courseToDTO(data)),
    switchMap(dto => this.coursesService.updateById(dto).pipe(
      tap(({ title }) => alert(`Successfully updated course "${title}"`)),
      map(() => actions.editCourseSuccess()),
      catchError(() => of(actions.editCourseFailure()))
    ))
  ));

  loadAuthorsSuggestions$ = createEffect(() => this.actions$.pipe(
    ofType(types.LoadAuthorSuggestions),
    map(({ data: term }) => term),
    switchMap(term => this.authorsService.getAuthors(term).pipe(
      map(authorsData => actions.setAuthorSuggestions({ data: authorsData })),
      catchError(() => of(actions.loadAuthorSuggestionsFailure()))
    ))
  ));

  setPrefillData$ = createEffect(() => this.actions$.pipe(
    ofType(coursesTypes.LoadSingleCourseSuccess),
    filter(({ useAsFormPrefill }) => useAsFormPrefill),
    map(({ data }) => actions.setPrefill({ data }))
  ));
}
