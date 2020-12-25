import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './courses.actions';
import * as types from './courses.types';
import * as fromCourses from './courses.selectors';
import * as fromSearch from '../search';
import { switchMap, withLatestFrom, catchError, map, concatMap } from 'rxjs/operators';
import { CoursesService } from '../../services/courses/courses.service';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private store: Store
  ) {}

  fetchCourses$ = createEffect(() => this.actions$.pipe(
    ofType(types.LoadCourses),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store.select(fromCourses.getStart),
        this.store.select(fromCourses.getCount),
        this.store.select(fromSearch.getTerm),
        ({ behavior = 'set' }, start, count, term) => ({
          behavior,
          params: { start, count, term }
        }))
      )
    ),
    switchMap(({ behavior, params }) => this.coursesService.getList(params).pipe(
      map(response => ({ ...response, behavior })),
    )),
    switchMap(({ behavior, list, hasNext }) => [
      behavior === 'append'
        ? actions.appendCourses({ data: list })
        : actions.setCourses({ data: list }),
      actions.setHasNextFlag({ data: hasNext })
    ]),
    catchError(() => of(actions.loadCoursesFailure())),
  ));

  fetchSingleCourse$ = createEffect(() => this.actions$.pipe(
    ofType(types.LoadSingleCourse),
    switchMap(({ id, useAsFormPrefill }) => this.coursesService.getById(id).pipe(
      map(data => actions.loadSingleCourseSuccess({ data, useAsFormPrefill })),
      catchError(() => of(actions.LoadSingleCourseFailure()))
    )),
  ));

  deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(types.DeleteCourse),
    switchMap(({ data: id }) => this.coursesService.deleteById(id).pipe(
      map(() => actions.deleteCourseSuccess({ data: id })),
      catchError(() => of(actions.deleteCourseFailure()))
    ))
  ));
}
