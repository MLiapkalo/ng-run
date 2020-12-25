import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DurationInputComponent,
      multi: true
    }
  ],
})
export class DurationInputComponent implements ControlValueAccessor {
  private durationValue = 0;

  propagateChanges: (v: number) => any;
  onTouched: any;

  get value(): number {
    return this.durationValue;
  }

  handleInput(event: InputEvent) {
    this.durationValue = +(event.target as HTMLInputElement).value;
    this.propagateChanges(this.durationValue);
  }

  writeValue(value: number) {
    if (value !== undefined) {
      this.durationValue = value;
    }
  }

  registerOnChange(fn: (v: number) => any) {
    this.propagateChanges = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
