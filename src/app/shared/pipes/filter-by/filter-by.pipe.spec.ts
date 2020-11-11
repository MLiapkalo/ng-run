import { FilterByPipe } from './filter-by.pipe';

const samples = [
  { a: 1, b: 'sample 1' },
  { a: 2, b: 'sample 2' },
  { a: 3, b: 'sample 3' },
  { a: 4, b: 'sample 4' },
  { a: 5, b: 'sample 5' },
];

describe('FilterByPipe', () => {
  let pipe: FilterByPipe;

  beforeEach(() => {
    pipe = new FilterByPipe();
  });

  it('should do nothing when list is null or undefined', () => {
    expect(pipe.transform(undefined, 'b', 'sam')).toBeUndefined();
    expect(pipe.transform(null, 'b', 'sam')).toBeNull();
  });

  it('should do nothing when key is not provided', () => {
    expect(pipe.transform(samples, undefined, 'sam')).toBe(samples);
  });

  it('should check if field contains matcher when both of them are strings', () => {
    expect(pipe.transform(samples, 'b', 'sam').length).toBe(samples.length);
    expect(pipe.transform(samples, 'b', '1').length).toBe(1);
  });

  it('should return the exact copy of the list if matcher is an empty string', () => {
    expect(pipe.transform(samples, 'b', '').length).toBe(samples.length);
  });

  it('should check if field is strictly equal to matcher when either field or matcher is not a string', () => {
    expect(pipe.transform(samples, 'a', 5).length).toBe(1);
    expect(pipe.transform(samples, 'a', '5').length).toBe(0);
  });
});
