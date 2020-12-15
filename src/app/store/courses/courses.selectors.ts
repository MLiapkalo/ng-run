import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State as CoursesState } from './courses.reducer';
import { State } from '..';

const getCoursesFeature = createFeatureSelector<State, CoursesState>(featureKey);

export const getCoursesList = createSelector(
  getCoursesFeature,
  ({ list }: CoursesState) => list
);

export const getCourseById = createSelector(
  getCoursesList,
  (list, { id: courseId }) => list.find(({ id }) => id === courseId)
);

export const getStart = createSelector(
  getCoursesFeature,
  ({ start }: CoursesState) => start
);

export const getCount = createSelector(
  getCoursesFeature,
  ({ count }: CoursesState) => count
);

export const getPage = createSelector(
  getCoursesFeature,
  ({ page }: CoursesState) => page
);

export const getHasNextFlag = createSelector(
  getCoursesFeature,
  ({ hasNext }: CoursesState) => hasNext
);

export const getIsLoadingFlag = createSelector(
  getCoursesFeature,
  ({ isLoading }: CoursesState) => isLoading
);

export const getCoursesErrorFlag = createSelector(
  getCoursesFeature,
  ({ getError }: CoursesState) => getError
);

export const deleteCourseErrorFlag = createSelector(
  getCoursesFeature,
  ({ deleteError }: CoursesState) => deleteError
);
