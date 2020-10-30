import { OrderByPipe } from './order-by.pipe';
import { ListOrdering } from '../../shared/enums/listOrdering';

const unordered = [
  { prop1: 5, prop2: 'c' },
  { prop1: 3, prop2: 'e' },
  { prop1: 1, prop2: 'd' },
  { prop1: 2, prop2: 'b' },
  { prop1: 4, prop2: 'a' },
];

const isAscOrderedByKey = (arr, key) => arr.every((v, i) => (i === 0 || v[key] >= arr[i - 1][key]));
const isDescOrderedByKey = (arr, key) => arr.every((v, i) => (i === 0 || v[key] <= arr[i - 1][key]));

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('should do nothing if list is null or undefined', () => {
    expect(pipe.transform(undefined, 'prop1', ListOrdering.Asc)).toBeUndefined();
    expect(pipe.transform(null, 'prop1', ListOrdering.Asc)).toBeNull();
  });

  it('should do nothing if key is not provided', () => {
    expect(pipe.transform(unordered, undefined, ListOrdering.Asc)).toBe(unordered);
  });

  it('should order by numerical field', () => {
    const orderedByProp1Asc = pipe.transform(unordered, 'prop1', ListOrdering.Asc);
    const orderedByProp1Desc = pipe.transform(unordered, 'prop1', ListOrdering.Desc);

    expect(isAscOrderedByKey(orderedByProp1Asc, 'prop1')).toBeTrue();
    expect(isDescOrderedByKey(orderedByProp1Desc, 'prop1')).toBeTrue();
  });

  it('should order by string field', () => {
    const orderedByProp2Asc = pipe.transform(unordered, 'prop2', ListOrdering.Asc);
    const orderedByProp2Desc = pipe.transform(unordered, 'prop2', ListOrdering.Desc);

    expect(isAscOrderedByKey(orderedByProp2Asc, 'prop2')).toBeTrue();
    expect(isDescOrderedByKey(orderedByProp2Desc, 'prop2')).toBeTrue();
  });
});
