import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Directive, Input } from '@angular/core';
import { Component } from '@angular/core';

import { CourseModel } from '../../shared/models/course.model';
import { CourseCardComponent } from './course-card.component';
import { pipeStub } from '../../shared/testUtils';

@Directive({
  selector: '[appRecent]'
})
class StubRecentDirective {
  @Input('appRecent')
  inp: any;
}

@Component({
  selector: 'app-test-host',
  template: `
    <app-course-card
        (delete)="onCourseDelete($event)"
        (edit)="onCourseEdit($event)"
        [course]="course">
    </app-course-card>
  `,
})
class TestHostComponent {
  course = new CourseModel('1', 'title', 45, 'description', new Date(2020, 9, 26), true);
  deletedCourseId: string;
  editedCourseId: string;

  onCourseDelete(id: string): void {
    this.deletedCourseId = id;
  }

  onCourseEdit(id: string): void {
    this.editedCourseId = id;
  }
}

const SELECTORS = {
  title: '[data-test-id="title"]',
  description: '[data-test-id="description"]',
  duration: '[data-test-id="duration"]',
  date: '[data-test-id="date"]',
  editBtn: '[data-test-id="edit-btn"]',
  deleteBtn: '[data-test-id="delete-btn"]'
};

describe('CourseCardComponent', () => {
  let de: DebugElement;
  let host: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseCardComponent,
        TestHostComponent,
        pipeStub('duration'),
        StubRecentDirective
      ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);

    host = hostFixture.componentInstance;
    de = hostFixture.debugElement;

    hostFixture.detectChanges();
  });

  it('should always render title', () => {
    const titleEl = de.query(By.css(SELECTORS.title)).nativeElement;
    expect(titleEl.textContent).toContain(host.course.title.toUpperCase());
  });

  it('should always render description', () => {
    const descriptionEl = de.query(By.css(SELECTORS.description)).nativeElement;
    expect(descriptionEl.textContent).toContain(host.course.description);
  });

  it('should always render duration', () => {
    const durationEl = de.query(By.css(SELECTORS.duration)).nativeElement;
    expect(durationEl.textContent).toContain(host.course.duration);
  });

  it('should always render date', () => {
    const dateEl = de.query(By.css(SELECTORS.date)).nativeElement;
    expect(dateEl.textContent).toContain('26 Oct, 2020');
  });

  it('should emit course id for deletion', () => {
    const deleteBtnEl = de.query(By.css(SELECTORS.deleteBtn));
    expect(host.deletedCourseId).toBeUndefined();
    deleteBtnEl.triggerEventHandler('click', null);
    expect(host.deletedCourseId).toBe(host.course.id);
  });
});
