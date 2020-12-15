import {
  ActionReducerMap,
} from '@ngrx/store';
import * as Courses from './courses';
import * as Search from './search';
import * as Auth from './auth';

export interface State {
  [Courses.featureKey]: Courses.State;
  [Search.featureKey]: Search.State;
  [Auth.featureKey]: Auth.State;
}

export const reducers: ActionReducerMap<State> = {
  [Courses.featureKey]: Courses.reducer,
  [Search.featureKey]: Search.reducer,
  [Auth.featureKey]: Auth.reducer,
};
