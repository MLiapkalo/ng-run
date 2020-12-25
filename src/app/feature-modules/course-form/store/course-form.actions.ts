import { createAction, props } from '@ngrx/store';
import * as types from './course-form.types';
import { Course } from '../../../shared/interfaces/Course';
import { AuthorModel } from '../../../shared/models/author.model';

export const addCourse = createAction(types.AddCourse, props<{ data: Course }>());
export const addCourseSuccess = createAction(types.AddCourseSuccess);
export const addCourseFailure = createAction(types.AddCourseFailure);

export const editCourse = createAction(types.EditCourse, props<{ data: Course }>());
export const editCourseSuccess = createAction(types.EditCourseSuccess);
export const editCourseFailure = createAction(types.EditCourseFailure);

export const loadAuthorSuggestions = createAction(
  types.LoadAuthorSuggestions,
  props<{ data: string }>()
);
export const setAuthorSuggestions = createAction(
  types.SetAuthorSuggestions,
  props<{ data: AuthorModel[] }>()
);
export const loadAuthorSuggestionsFailure = createAction(types.LoadAuthorSuggestionsFailure);

export const setPrefill = createAction(
  types.SetPrefill,
  props<{ data: Course }>()
)
export const reset = createAction(types.Reset);
