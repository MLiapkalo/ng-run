import { createAction, props } from '@ngrx/store';
import * as types from './courses.types';
import { Course, FetchCoursesBehavior } from '../../shared/interfaces/Course';

export const loadCourses = createAction(types.LoadCourses, props<{ behavior: FetchCoursesBehavior }>());

export const appendCourses = createAction(
  types.AppendCourses,
  props<{ data: Course[] }>()
);

export const setCourses = createAction(
  types.SetCourses,
  props<{ data: Course[] }>()
);

export const deleteCourse = createAction(
  types.DeleteCourse,
  props<{ data: number }>()
);

export const deleteCourseSuccess = createAction(
  types.DeleteCourseSuccess,
  props<{ data: number }>()
);

export const loadCoursesFailure = createAction(types.LoadCoursesFailure);

export const deleteCourseFailure = createAction(types.DeleteCourseFailure);

export const toNextPage = createAction(types.ToNextPage);

export const resetPagination = createAction(types.ResetPagination);

export const setHasNextFlag = createAction(
  types.SetHasNextFlag,
  props<{ data: boolean }>()
);

export const computeStartPointer = createAction(types.ComputeStartPointer);
