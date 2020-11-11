import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RecentDirective } from './recent.directive';

const COLORS = {
  recent: 'green',
  upcoming: 'blue'
};

const DAY_IN_MS = 86400000;

const NOW_IN_MS = Date.now();
const YESTERDAY_IN_MS = NOW_IN_MS - DAY_IN_MS;
const TOMORROW_IN_MS = NOW_IN_MS + DAY_IN_MS;
const THREE_WEEKS_AGO_IN_MS = NOW_IN_MS - (DAY_IN_MS * 21);

@Component({
  template: `
    <p
      [appRecent]="today"
      data-test-id="noColors">
      No colors provided
    </p>
    <p
      [appRecent]="threeWeeksAgo"
      [recentHighlightColor]="rcnColor"
      [upcomingHighlightColor]="upcColor"
      data-test-id="threeWeeksAgo">
    </p>
    <p
      [appRecent]="yesterday"
      [recentHighlightColor]="rcnColor"
      data-test-id="yesterday">
    </p>
    <p
      [appRecent]="today"
      [recentHighlightColor]="rcnColor"
      data-test-id="today">
    </p>
    <p
      [appRecent]="tomorrow"
      [upcomingHighlightColor]="upcColor"
      data-test-id="tomorrow">
    </p>
  `
})
class DirectiveHostTestComponent {
  threeWeeksAgo = new Date(THREE_WEEKS_AGO_IN_MS);
  yesterday = new Date(YESTERDAY_IN_MS);
  today = new Date(NOW_IN_MS);
  tomorrow = new Date(TOMORROW_IN_MS);

  upcColor = COLORS.upcoming;
  rcnColor = COLORS.recent;
}

const byTestId = id => By.css(`[data-test-id="${id}"]`);

describe('RecentDirective', () => {
  let fixture: ComponentFixture<DirectiveHostTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        DirectiveHostTestComponent,
        RecentDirective
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectiveHostTestComponent);
    fixture.detectChanges();
  });

  it('should not highlight if there are no provided colors', () => {
    const noColorsDe = fixture.debugElement.query(byTestId('noColors'));
    expect(noColorsDe.styles.boxShadow).toBeFalsy();
  });

  it('should not highlight if the date is more than 2 weeks ago', () => {
    const threeWeeksAgo = fixture.debugElement.query(byTestId('threeWeeksAgo'));
    expect(threeWeeksAgo.styles.boxShadow).toBeFalsy();
  });

  it('should highlight element with recentHighlightColor if date <= today and date >= two weeks ago', () => {
    const todayDe = fixture.debugElement.query(byTestId('today'));
    const yesterdayDe = fixture.debugElement.query(byTestId('yesterday'));
    expect(todayDe.styles.boxShadow).toContain(COLORS.recent);
    expect(yesterdayDe.styles.boxShadow).toContain(COLORS.recent);
  });

  it('should highlight element with upcomingHighlightColor', () => {
    const tomorrowDe = fixture.debugElement.query(byTestId('tomorrow'));
    expect(tomorrowDe.styles.boxShadow).toContain(COLORS.upcoming);
  });
});
