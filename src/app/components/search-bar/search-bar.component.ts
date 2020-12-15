import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getTerm, setSearchTerm } from '../../store/search';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements AfterViewInit {
  term: Observable<string> = this.store.select(getTerm);

  @ViewChild('searchInput')
  private searchInputEl: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store
  ) {}

  private normalize(value: string): string {
    return value.toLowerCase().trim();
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInputEl.nativeElement, 'keyup').pipe(
      debounceTime(500),
      map(evt => (evt.target as HTMLInputElement).value),
      map(this.normalize),
      distinctUntilChanged()
    ).subscribe(data => this.store.dispatch(setSearchTerm({ data })));
  }
}
