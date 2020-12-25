import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey } from './router.reducer';

const getRouterFeature = createFeatureSelector(featureKey);

const getRouterState = createSelector(
    getRouterFeature,
    ({ state }) => state
);

const getParams = createSelector(
    getRouterState,
    ({ params }) => params
);

export {
    getRouterState,
    getParams
}