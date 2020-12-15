import { ActionReducer, createReducer, on } from '@ngrx/store';
import * as actions from './course-form.actions';

export const featureKey = 'course-form';

export interface State {
  isLoading: boolean;
  error: boolean;
}

export const initialState: State = {
  error: false,
  isLoading: false,
};

export const reducer: ActionReducer<State> = createReducer(
  initialState,
  on(actions.addCourse, actions.editCourse, () => ({ isLoading: true, error: false })),
  on(actions.addCourseFailure, actions.editCourseFailure, () => ({ isLoading: false, error: true })),
  on(actions.addCourseSuccess, actions.editCourseSuccess, () => initialState)
);

