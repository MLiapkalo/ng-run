import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter, DebugElement } from '@angular/core';

import { CoursesPageComponent } from './courses-page.component';
import { FilterByPipe } from '../../shared/pipes/filter-by/filter-by.pipe';
import { COURSES_LIST } from '../../shared/mocks/courses.mock';
import { pipeStub, componentStubSeries } from '../../shared/testUtils';
import { CoursesService } from '../../services/courses/courses.service';

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

class CoursesServiceMock {
  private _courses = COURSES_LIST;

  getList() {
    return [...this._courses];
  }

  deleteById(id: string) {
    this._courses = this._courses.filter(({ id: courseId }) => courseId !== id);
  }
}

describe('CoursesPageComponent', () => {
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
         { provide: FilterByPipe, useClass: pipeStub('filterBy') },
         {
           provide: CoursesService,
           useClass: CoursesServiceMock
         }
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
    expect(component.courses).not.toEqual(COURSES_LIST);
    component.ngOnInit();
    expect(component.courses).toEqual(COURSES_LIST)
  });

  it('should handle course deletion', () => {
    spyOn(window, 'confirm').and.returnValue(true);
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
