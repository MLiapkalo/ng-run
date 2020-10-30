import { Component, Pipe, PipeTransform } from '@angular/core';

const componentStub = (selector: string) => Component({ selector, template: '' })(class {});
const pipeStub = (name: string) => Pipe({ name })(class implements PipeTransform {
  transform(value: any): any {
    return value;
  }
});

const componentStubSeries = (...selectors: string[]): object[] => selectors.map(componentStub);
const pipeStubSeries = (...names: string[]): object[] => names.map(pipeStub);

export {
  componentStub,
  pipeStub,
  componentStubSeries,
  pipeStubSeries
};
