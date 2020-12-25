import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { AuthorsInputComponent } from './components/authors-input/authors-input.component';
import { DurationInputComponent } from './components/duration-input/duration-input.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { featureKey, reducer } from './store';
import { CourseFormEffects } from './store/course-form.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    DateInputComponent,
    AuthorsInputComponent,
    DurationInputComponent,
    CourseFormComponent
  ],
  exports: [CourseFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([CourseFormEffects]),
    StoreModule.forFeature(featureKey, reducer)
  ]
})
export class CourseFormModule { }
