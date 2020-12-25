import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Course } from '../../../../shared/interfaces/Course';
import { Store } from '@ngrx/store';
import { addCourse, editCourse, reset } from '../../store/course-form.actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as fromCourseForm from '../../../course-form/store/course-form.selectors';
import { LoadingStateService } from '../../../../services/loading-state/loading-state.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { generateUID } from '../../../../mappers/course.mapper';
import { minListLength } from '../../components/authors-input/authors.validators';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, OnDestroy {
  @Input()
  mode: 'create' | 'edit' = 'create';
  courseForm: FormGroup;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private location: Location,
    private loadingStateService: LoadingStateService
  ) {
    this.courseForm = this.createForm();
  }

  get isLoading(): Observable<boolean> {
    return this.loadingStateService.isLoading();
  }

  createForm(): FormGroup {
    const defaults = this.defaults;
    return this.fb.group({
      id: [defaults.id],
      topRated: [defaults.topRated],
      title: [defaults.title, Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])],
      description: [defaults.description, Validators.compose([
        Validators.required,
        Validators.maxLength(500)
      ])],
      duration: [defaults.duration, Validators.compose([
        Validators.required,
        Validators.min(1)
      ])],
      creationDate: [defaults.creationDate.toString(), Validators.required],
      authors: [defaults.authors, Validators.compose([
        Validators.required,
        minListLength(1)
      ])]
    });
  }

  private get defaults(): Course {
    return {
      id: this.isInCreateMode ? generateUID() : null,
      title: '',
      description: '',
      duration: 0,
      creationDate: new Date(),
      authors: [],
      topRated: false
    };
  }

  get isInCreateMode(): boolean {
    return this.mode === 'create';
  }

  ngOnInit(): void {
    this.loadingStateService.observeFlag(
      this.store.select(fromCourseForm.getIsLoadingFlag)
    );

    this.store.select(fromCourseForm.getErrorFlag)
      .pipe(takeUntil(this.destroy))
      .subscribe(isError => {
        if (isError) {
          alert(`Oops, an error has occurred while ${
            this.mode === 'create' ? 'creating' : 'updating'
          } course`);
        }
    });

    this.store.select(fromCourseForm.getPrefill)
      .pipe(takeUntil(this.destroy))
      .subscribe(prefillFromStore => {
        if (prefillFromStore)
          this.courseForm.setValue(prefillFromStore);
      })
  }

  ngOnDestroy(): void {
    this.loadingStateService.leaveFlag();
    this.store.dispatch(reset());
    this.destroy.next(true);
  }

  private doPost(): void {
    this.store.dispatch(addCourse({ data: this.courseForm.value }));
  }

  private doPatch(): void {
    this.store.dispatch(editCourse({ data: this.courseForm.value }));
  }

  onSubmit(): void {
    this.isInCreateMode ? this.doPost() : this.doPatch();
  }

  navigateBack(): void {
    this.location.back();
  }
}
