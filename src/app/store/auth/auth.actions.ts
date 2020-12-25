import { createAction, props } from '@ngrx/store';
import * as types from './auth.types';
import { UserInfo } from '../../shared/interfaces/User';
import { Credentials } from '../../shared/interfaces/Credentials';

export const requestLogin = createAction(types.LoginRequest, props<{ data: Credentials }>());

export const checkForUserInfo = createAction(types.CheckForUserInfo);

export const setUserInfo = createAction(
  types.SetUserInfo,
  props<{ data: UserInfo }>()
);

export const loginRequestFailure = createAction(types.LoginRequestFailure);

export const logout = createAction(types.Logout);

export const resetFlags = createAction(types.ResetFlags);
