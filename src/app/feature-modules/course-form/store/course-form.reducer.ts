import { ActionReducer, createReducer, on } from '@ngrx/store';
import * as actions from './course-form.actions';
import { AuthorModel } from '../../../shared/models/author.model';
import { Course } from '../../../shared/interfaces/Course';

export const featureKey = 'course-form';

export interface State {
  prefill: Course;
  authorSuggestions: AuthorModel[];
  isLoading: boolean;
  error: boolean;
  authorSuggestionsError: boolean;
}

export const initialState: State = {
  prefill: null,
  authorSuggestions: [],
  error: false,
  isLoading: false,
  authorSuggestionsError: false
};

export const reducer: ActionReducer<State> = createReducer(
  initialState,
  on(actions.addCourse, actions.editCourse, state => ({
    ...state,
    isLoading: true,
    error: false
  })),
  on(actions.addCourseFailure, actions.editCourseFailure, state => ({
    ...state,
    isLoading: false,
    error: true
  })),
  on(actions.addCourseSuccess, actions.editCourseSuccess, state => ({
    ...state,
    error: false,
    isLoading: false
  })),
  on(actions.setAuthorSuggestions, (state, { data }) => ({
    ...state,
    authorSuggestions: data,
    authorSuggestionsError: false
  })),
  on(actions.loadAuthorSuggestionsFailure, state => ({
    ...state,
    authorSuggestionsError: true
  })),
  on(actions.setPrefill, (state, { data }) => ({
    ...state,
    prefill: data
  })),
  on(actions.reset, () => initialState)
);

