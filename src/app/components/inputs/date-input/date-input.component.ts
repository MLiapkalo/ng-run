import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent {
  private dateValue = '';

  constructor(
    private datePipe: DatePipe
  ) {}

  @Output()
  dateChange = new EventEmitter<string>();

  @Input()
  set date(value: string) {
    this.dateValue = new Date(value).toString();
    this.dateChange.emit(this.dateValue);
  }

  get date(): string {
    // this transform is required since input[type=date] takes only yyyy-MM-dd format
    return this.datePipe.transform(this.dateValue, 'yyyy-MM-dd');
  }
}
