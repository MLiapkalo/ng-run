import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getTerm, setSearchTerm } from '../../store/search';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  searchInput = new FormControl('');

  constructor(
    private store: Store
  ) {}

  private normalize(value: string): string {
    return value.toLowerCase().trim();
  }

  ngOnInit(): void {
    this.store.select(getTerm)
      .pipe(takeUntil(this.destroy))
      .subscribe(term => this.searchInput.setValue(term));
    
    this.searchInput.valueChanges.pipe(
      takeUntil(this.destroy),
      debounceTime(500),
      map(this.normalize),
      distinctUntilChanged()
    ).subscribe(data => this.store.dispatch(setSearchTerm({ data })));
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
  }
}
