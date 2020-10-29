import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SearchBarComponent } from './search-bar.component';

const SELECTORS = {
  input: '[data-test-id="input"]',
  submit: '[data-test-id="submit"]'
};

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let de: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ SearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep input value and component property in sync', () => {
    const inputEl = de.query(By.css(SELECTORS.input)).nativeElement;
    const expectedTerm = 'blah blah blah';

    inputEl.value = expectedTerm;
    inputEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.term).toBe(expectedTerm);
  });

  it('should handle search term submit', () => {
    const submitButtonDe = de.query(By.css(SELECTORS.submit));
    const expectedTerm = 'blah blah blah';

    component.term = expectedTerm;
    spyOn(console, 'log');
    submitButtonDe.triggerEventHandler('click', null);

    expect(console.log).toHaveBeenCalledWith(`Search submit: ${ expectedTerm }`);
  });
});
