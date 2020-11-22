import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Input, DebugElement } from '@angular/core';

import { CoursesListComponent } from './courses-list.component';
import { COURSES_LIST } from '../../shared/mocks/courses.mock';
import { pipeStub } from '../../shared/testUtils';
import { FilterByPipe } from '../../shared/pipes/filter-by/filter-by.pipe';
import { CoursesService } from '../../services/courses/courses.service';

const ID = '1';

@Component({
  selector: 'app-course-card',
  template: '',
})
class CourseCardStubComponent {
  @Input()
  course: any;
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

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let de: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        CourseCardStubComponent,
        pipeStub('orderBy')
      ],
      providers: [
        { 
          provide: FilterByPipe, 
          useClass: pipeStub('filterBy')
        },
        {
          provide: CoursesService,
          useClass: CoursesServiceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    de = fixture.debugElement;

    component = fixture.componentInstance;
    component.list = COURSES_LIST;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list of entries', () => {
    const entries = de.queryAll(By.css('.courses-list__entry'));
    expect(entries.length).toBe(COURSES_LIST.length);
  });

  it('should load more courses on "Load more" button click', () => {
    const button = de.query(By.css('.courses-list__load > button'));

    spyOn(console, 'log');
    button.triggerEventHandler('click', null);

    expect(console.log).toHaveBeenCalledWith('Load more');
  });

  it('should handle course deletion', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    fixture.detectChanges();

    expect(component.list.find(({ id }) => id === ID)).toBeTruthy();

    component.deleteCourse(ID)

    expect(component.list.find(({ id }) => id === ID)).toBeUndefined();
  });
});
