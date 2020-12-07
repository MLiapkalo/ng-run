import { Component, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, filter, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements AfterViewInit {
  @Output()
  termChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchInput')
  private searchInputEl: ElementRef<HTMLInputElement>;

  private normalize(value: string) {
    return value.toLowerCase().trim();
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInputEl.nativeElement, 'keyup').pipe(
      debounceTime(500),
      map(evt => (evt.target as HTMLInputElement).value),
      map(this.normalize),
      filter(value => value.length > 2),
      distinctUntilChanged()
    ).subscribe(value => this.termChange.emit(value))
  }
}
