import { DurationPipe } from './duration.pipe';

const HOURS_LABEL = 'h';
const MINS_LABEL = 'm';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('should transform properly', () => {
    pipe = new DurationPipe();
    expect(pipe.transform(65, HOURS_LABEL, MINS_LABEL)).toBe('1 h 5 m');
  });

  it('should show only hours when there are no minutes', () => {
    pipe = new DurationPipe();
    expect(pipe.transform(120, HOURS_LABEL, MINS_LABEL)).toBe('2 h');
  });

  it('should show only minutes when duration is less than hour', () => {
    pipe = new DurationPipe();
    expect(pipe.transform(35, HOURS_LABEL, MINS_LABEL)).toBe('35 m');
  });

  it('should return empty string for 0', () => {
    pipe = new DurationPipe();
    expect(pipe.transform(0, HOURS_LABEL, MINS_LABEL)).toBeFalsy();
  });
});
