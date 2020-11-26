import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  template: `
    <h1>Page not found</h1>
    <a routerLink="/">Back to home</a>
  `
})
export class NotFoundPageComponent {}
