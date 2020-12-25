import { createReducer, on } from '@ngrx/store';
import { UserInfo } from '../../shared/interfaces/User';
import * as actions from './auth.actions';

export const featureKey = 'auth';

export interface State {
  isLoading: boolean;
  error: boolean;
  user: UserInfo;
}

const initialState: State = {
  isLoading: false,
  error: false,
  user: null
};

export const getInitialState: () => State = () => ({ ...initialState })

export const reducer = createReducer(
  getInitialState(),
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
  on(actions.logout, () => getInitialState()),
  on(actions.resetFlags, state => ({ 
    ...state, 
    isLoading: false,
    error: false
  }))
);

