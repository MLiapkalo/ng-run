import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateInputComponent,
      multi: true
    }
  ],
})
export class DateInputComponent implements ControlValueAccessor {
  private dateValue = '';

  propagateChanges: (v: string) => any;
  onTouched: any;

  constructor(
    private datePipe: DatePipe
  ) {}

  get value(): string {
    return this.dateValue;
  }

  handleInput(event: InputEvent) {
    this.dateValue = this.transformDate((event.target as HTMLInputElement).value)
    this.propagateChanges(
      this.transformDate(this.dateValue, 'dd/MM/yyyy')
    );
  }

  transformDate(dateString: string, patternString = 'yyyy-MM-dd') {
    return this.datePipe.transform(new Date(dateString), patternString);
  }

  writeValue(value: string): void {
    if (value !== undefined) {
      // this transform is required since input[type=date] takes only yyyy-MM-dd format
      this.dateValue = this.transformDate(value);
    }
  }

  registerOnChange(fn: (v: string) => any) {
    this.propagateChanges = fn;
  } 

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
