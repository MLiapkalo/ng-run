import {createAction, createFeatureSelector, createReducer, on, props} from '@ngrx/store';

export const featureKey = 'search';

export const SetSearchTerm = '[Search] Set Search Term';
export const setSearchTerm = createAction(SetSearchTerm, props<{ data: string }>());

export type State = string;

export const initialState = '';

export const getTerm = createFeatureSelector<string>(featureKey);

export const reducer = createReducer(
  initialState,
  on(setSearchTerm, (_, { data }) => data)
);

