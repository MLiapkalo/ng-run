import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterByPipe } from './pipes/filter-by/filter-by.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { RecentDirective } from './directives/recent/recent.directive';

import { COURSES_LIST, COURSES_MOCK } from './mocks/courses.mock';

@NgModule({
  declarations: [
    FilterByPipe,
    OrderByPipe,
    DurationPipe,
    RecentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterByPipe,
    OrderByPipe,
    DurationPipe,
    RecentDirective
  ],
  providers: [
    FilterByPipe,
    {
      provide: COURSES_MOCK,
      useValue: COURSES_LIST
    }
  ]
})
export class SharedModule { }
