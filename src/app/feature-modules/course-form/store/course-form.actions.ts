import { createAction, props } from '@ngrx/store';
import * as types from './course-form.types';
import { CourseDTO } from '../../../shared/interfaces/Course';

export const addCourse = createAction(types.AddCourse, props<{ data: CourseDTO }>());
export const addCourseSuccess = createAction(types.AddCourseSuccess);
export const addCourseFailure = createAction(types.AddCourseFailure);

export const editCourse = createAction(types.EditCourse, props<{ data: CourseDTO }>());
export const editCourseSuccess = createAction(types.EditCourseSuccess);
export const editCourseFailure = createAction(types.EditCourseFailure);
