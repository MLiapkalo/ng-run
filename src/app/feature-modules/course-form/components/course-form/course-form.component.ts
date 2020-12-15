import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CourseDTO } from '../../../../shared/interfaces/Course';
import { generateUID } from '../../../../mappers/course.mapper';
import { Store } from '@ngrx/store';
import { addCourse, editCourse } from '../../store/course-form.actions';
import { Subscription } from 'rxjs';
import { getErrorFlag } from '../../store/course-form.selectors';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, OnDestroy {
  @Input()
  mode: 'create' | 'edit' = 'create';
  errorSub: Subscription;

  @Input()
  payload: CourseDTO = {
    id: this.mode === 'create' ? generateUID() : null,
    name: '',
    description: '',
    length: 0,
    date: new Date().toString(),
    isTopRated: false,
    authors: []
  };

  constructor(
    private store: Store,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.errorSub = this.store.select(getErrorFlag)
      .pipe(skip(1))
      .subscribe(isError => {
        if (isError) {
          alert(`Oops, an error has occurred while ${
            this.mode === 'create' ? 'creating' : 'updating'
          } course`);
        }
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  private doPost(): void {
    this.store.dispatch(addCourse({ data: this.payload }));
  }

  private doPatch(): void {
    this.store.dispatch(editCourse({ data: this.payload }));
  }

  onSubmit(): void {
    this.mode === 'create' ? this.doPost() : this.doPatch();
  }

  navigateBack(): void {
    this.location.back();
  }
}
