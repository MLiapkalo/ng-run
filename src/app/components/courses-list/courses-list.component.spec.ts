import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Input, DebugElement } from '@angular/core';

import { CoursesListComponent } from './courses-list.component';
import COURSES_MOCK from '../../shared/mocks/courses.mock';

@Component({
  selector: 'app-course-card',
  template: '',
})
class CourseCardStubComponent {
  @Input()
  course: any;
}

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let de: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        CourseCardStubComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    de = fixture.debugElement;

    component = fixture.componentInstance;
    component.list = COURSES_MOCK;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list of entries from binding', () => {
    const entries = de.queryAll(By.css('.courses-list__entry'));
    expect(entries.length).toBe(COURSES_MOCK.length);
  });

  it('should load more courses on "Load more" button click', () => {
    const button = de.query(By.css('.courses-list__load > button'));

    spyOn(console, 'log');
    button.triggerEventHandler('click', null);

    expect(console.log).toHaveBeenCalledWith('Load more');
  });
});
