import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter, DebugElement } from '@angular/core';

import { CoursesPageComponent } from './courses-page.component';
import { FilterByPipe } from '../../pipes/filter-by/filter-by.pipe';
import COURSES_MOCK from '../../shared/mocks/courses.mock';
import { pipeStub, componentStubSeries } from '../../shared/testUtils';

const ID = '1';

@Component({
  selector: 'app-courses-list',
  template: '',
})
class CoursesListStubComponent {
  @Output()
  delete = new EventEmitter<string>();
  @Output()
  edit = new EventEmitter<string>();
  @Input()
  list: any[];
}

describe('CoursesListComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let de: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesPageComponent,
        CoursesListStubComponent,
        componentStubSeries(
          'app-header',
          'app-breadcrumbs',
          'app-search-bar',
          'app-add-course',
          'app-footer'
        ),
      ],
       providers: [
         { provide: FilterByPipe, useClass: pipeStub('filterBy') }
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses on init', () => {
    component.ngOnInit();
    expect(component.courses).toBe(COURSES_MOCK);
  });

  it('should handle course deletion', () => {
    fixture.detectChanges();

    expect(component.courses.find(({ id }) => id === ID)).toBeTruthy();

    de.query(By.directive(CoursesListStubComponent)).context.delete.emit(ID);

    expect(component.courses.find(({ id }) => id === ID)).toBeUndefined();
  });

  it('should handle course editing', () => {
    fixture.detectChanges();
    spyOn(console, 'log');

    de.query(By.directive(CoursesListStubComponent)).context.edit.emit(ID);

    expect(console.log).toHaveBeenCalledWith(`Edit course: ${ ID }`);
  });
});
