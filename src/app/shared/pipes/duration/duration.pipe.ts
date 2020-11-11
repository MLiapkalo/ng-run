import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number, hoursLabel: string = 'h', minutesLabel: string = 'm'): string {
    const hours = Math.trunc(value / 60);
    const minutes = value % 60;
    const parts = {
      hours: hours ? `${hours} ${hoursLabel}` : '',
      minutes: minutes ? `${minutes} ${minutesLabel}` : ''
    };
    return `${parts.hours} ${parts.minutes}`.trim();
  }
}
