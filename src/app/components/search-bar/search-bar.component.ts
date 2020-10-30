import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output()
  searchSubmit = new EventEmitter<string>();
  term = '';

  onSubmit(): void {
    console.log(`Search submit: ${this.term}`);
    this.searchSubmit.emit(this.term);
  }
}
