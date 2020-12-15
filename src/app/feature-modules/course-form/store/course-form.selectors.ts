import { createSelector } from '@ngrx/store';
import { featureKey, State as CourseFormState } from './course-form.reducer';

const getCoursesFormFeature = ({ [featureKey]: formFeature = {} }) => formFeature;

export const getIsLoadingFlag = createSelector(
  getCoursesFormFeature,
  ({ isLoading }: CourseFormState) => isLoading
);

export const getErrorFlag = createSelector(
  getCoursesFormFeature,
  ({ error }: CourseFormState) => error
);
