import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  term = '';

  onSubmit(): void {
    console.log(`Search submit: ${this.term}`);
  }
}
