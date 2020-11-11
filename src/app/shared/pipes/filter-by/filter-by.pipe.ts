import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
  private readonly isString = val => typeof val === 'string';

  transform<T>(list: T[], key: keyof T, matcher: any): T[] {
    const isStringMatcher = this.isString(matcher);

    if (!key) {
      console.error(`FilterByPipe: argument 'key' is not provided`);
      return list;
    }

    if (!Array.isArray(list)) {
      console.error(`FilterByPipe: argument 'list' is not of type Array`);
      return list;
    }

    return [...list].filter(entry => {
      const value: any = entry[key];
      return this.isString(value) && isStringMatcher
        ? value.toLowerCase().includes(matcher.toLowerCase())
        : value === matcher;
    });
  }
}
