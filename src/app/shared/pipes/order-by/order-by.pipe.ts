import {Pipe, PipeTransform} from '@angular/core';
import {ListOrdering} from '../../enums/listOrdering';

type CompareFunction = (a: any, b: any) => number;
type CompareByKeyFunction = (key: string | number | symbol) => CompareFunction;

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  private readonly compareFnsMap: Record<string, CompareByKeyFunction> = {
    asc: key => (a, b) => {
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;
      return 0;
    },
    desc: key => (a, b) => {
      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1;
      return 0;
    }
  };

  transform<T>(list: T[], orderByKey: keyof T, order: ListOrdering = ListOrdering.Desc): T[] {
    if (!Array.isArray(list)) {
      console.error(`OrderByPipe: argument 'list' is not of type Array`);
      return list;
    }

    if (!orderByKey) {
      console.error(`OrderByPipe: argument 'orderByKey' is not provided`);
      return list;
    }

    const createCompareFn = this.compareFnsMap[order];
    return [...list].sort(createCompareFn(orderByKey));
  }
}
