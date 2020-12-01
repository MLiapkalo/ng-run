import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss']
})
export class DurationInputComponent {
  private durationValue = 0;

  @Output()
  durationChange = new EventEmitter<number>();

  get duration(): number {
    return this.durationValue;
  }

  @Input()
  set duration(value: number) {
    this.durationValue = value;
    this.durationChange.emit(this.durationValue);
  }
}
