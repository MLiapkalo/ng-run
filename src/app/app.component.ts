import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkForUserInfo } from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-run';

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(checkForUserInfo());
  }
}
