import { RouterReducerState } from '@ngrx/router-store';
import { reducer, featureKey } from './router.reducer';
import { CustomRouterSerializer } from './router.serializer';
import * as selectors from './router.selectors';

export {
    featureKey,
    reducer,
    RouterReducerState as State,
    CustomRouterSerializer,
    selectors
}