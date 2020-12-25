import { createSelector } from '@ngrx/store';
import { featureKey, State as CourseFormState } from './course-form.reducer';
import { courseToDTO } from '../../../mappers/course.mapper';

const getCoursesFormFeature = ({ [featureKey]: formFeature = {} }) => formFeature;

export const getIsLoadingFlag = createSelector(
  getCoursesFormFeature,
  ({ isLoading }: CourseFormState) => isLoading
);

export const getAuthorSuggestionsError = createSelector(
  getCoursesFormFeature,
  ({ authorSuggestionsError }: CourseFormState) => authorSuggestionsError
);

export const getAuthorSuggestions = createSelector(
  getCoursesFormFeature,
  ({ authorSuggestions }: CourseFormState) => authorSuggestions
);

export const getPrefill = createSelector(
  getCoursesFormFeature,
  ({ prefill }: CourseFormState) => prefill
);

export const getErrorFlag = createSelector(
  getCoursesFormFeature,
  ({ error }: CourseFormState) => error
);
