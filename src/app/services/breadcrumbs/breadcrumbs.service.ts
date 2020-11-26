import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Breadcrumb } from '../../shared/interfaces/Breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ofBreadcrumbs(): Observable<Breadcrumb[]> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.buildBreadcrumbs(this.activatedRoute.root))
    );
  }

  private buildBreadcrumbs(route: ActivatedRoute, url = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (!children.length) return breadcrumbs;

    for (let child of children) {
      const { 
        snapshot: {
          url: urlSegments,
          data
        }
      } = child;

      // map url segments of route to URL-like string
      const routeURL: string = urlSegments.map(({ path }, i) => !i ? `/${path}` : path).join('/');

      // append to the resulting URL
      url += routeURL;

      // add breadcrumb if it is defined on the route
      if (data.breadcrumb) {
        let breadcrumb: Breadcrumb = {
          label: data.breadcrumb,
          url
        };
        breadcrumbs.push(breadcrumb);
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
