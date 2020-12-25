import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorModel } from '../../../../shared/models/author.model';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectors, actions } from '../../store';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AuthorsInputComponent,
      multi: true
    }
  ]
})
export class AuthorsInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private readonly destroy: Subject<boolean> = new Subject<boolean>();
  private authorSuggestionsError: Observable<boolean> = this.store.select(selectors.getAuthorSuggestionsError);
  private storeAuthorSuggestions: Observable<AuthorModel[]> = this.store.select(selectors.getAuthorSuggestions);

  authorName = new FormControl('');

  assignedAuthors: AuthorModel[] = [];
  authorSuggestions: AuthorModel[] = [];
  propagateChanges: (values: AuthorModel[]) => any;
  onTouched: any;

  constructor(
    private store: Store
  ) {}

  writeValue(values: AuthorModel []): void {
    if (values !== undefined) {
      this.assignedAuthors = values;
    }
  }

  registerOnChange(fn: (values: AuthorModel[]) => any): void {
    this.propagateChanges = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  private findAuthorById(list: AuthorModel[] = [], id: number): AuthorModel {
    return list.find(({ id: authorId }) => authorId === id);
  }

  assignAuthor(id: number): void {
    const author: AuthorModel = this.findAuthorById(this.authorSuggestions, id);

    if (author) {
      this.assignedAuthors = [...this.assignedAuthors, author];
      this.propagateChanges(this.assignedAuthors);
    }

    this.reset();
  }

  reset(): void {
    this.store.dispatch(actions.setAuthorSuggestions({ data: [] }));
    this.authorName.setValue('');
  }

  discardAuthor(id: number): void {
    const author: AuthorModel = this.findAuthorById(this.assignedAuthors, id);
    if (author) {
      this.assignedAuthors = this.assignedAuthors.filter(({ id: authorId }) => authorId !== author.id);
      this.propagateChanges(this.assignedAuthors);
    }
  }


  ngOnInit(): void {
    this.authorName.valueChanges.pipe(
      takeUntil(this.destroy),
      debounceTime(500),
      map(input => input.toLowerCase()),
      distinctUntilChanged()
    ).subscribe(
      name => name 
        ? this.store.dispatch(actions.loadAuthorSuggestions({ data: name })) 
        : this.store.dispatch(actions.setAuthorSuggestions({ data: [] }))
    );

    this.authorSuggestionsError
      .pipe(takeUntil(this.destroy))
      .subscribe(errorHasOccurred => {
        if (errorHasOccurred)
          alert('Unable to get author suggestions from server');
      });

    this.storeAuthorSuggestions
      .pipe(takeUntil(this.destroy))
      .subscribe(suggestions => this.authorSuggestions = suggestions);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
  }
}
