import { createReducer, on } from '@ngrx/store';
import { UserInfo } from '../../shared/interfaces/User';
import * as actions from './auth.actions';

export const featureKey = 'auth';

export interface State {
  isLoading: boolean;
  error: boolean;
  user: UserInfo;
}

export const initialState: State = {
  isLoading: false,
  error: false,
  user: null
};


export const reducer = createReducer(
  initialState,
  on(actions.requestLogin, state => ({ ...state, isLoading: true })),
  on(actions.setUserInfo, (state, { data }) => ({
    ...state,
    user: data,
    isLoading: false,
    error: false
  })),
  on(actions.loginRequestFailure, state => ({
    ...state,
    isLoading: false,
    error: true
  })),
  on(actions.logout, () => initialState)
);

