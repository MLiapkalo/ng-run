import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

interface State {
    url: string;
    params: Params;
    queryParams: Params;
}

export class CustomRouterSerializer implements RouterStateSerializer<State> {
    serialize(routerState: RouterStateSnapshot): State {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: { queryParams },
        } = routerState;
        const { params } = route;

        return { url, params, queryParams };
    }
}