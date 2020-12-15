import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State as AuthState } from './auth.reducer';
import { UserInfo } from '../../shared/interfaces/User';

const getAuthFeature = createFeatureSelector(featureKey);

export const getIsLoadingFlag = createSelector(
  getAuthFeature,
  ({ isLoading }: AuthState) => isLoading
);

export const getLoginErrorFlag = createSelector(
  getAuthFeature,
  ({ error }: AuthState) => error
);

export const isLoggedIn = createSelector(
  getAuthFeature,
  ({ user }: AuthState) => user !== null
);

export const getUser = createSelector(
  getAuthFeature,
  ({ user = {} as UserInfo }: AuthState) => user
);

export const getUserId = createSelector(
  getUser,
  ({ id }: UserInfo) => id
);

export const getUserFullName = createSelector(
  getUser,
  ({ name }: UserInfo) => name ? `${name.first} ${name.last}` : ''
);
