import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCoursePageComponent } from './components/edit-course-page/edit-course-page.component';
import { SharedModule } from '../../shared/shared.module';
import { EditCourseRoutingModule } from './edit-course-routing.module';
import { CourseFormModule } from '../course-form/course-form.module';

@NgModule({
  declarations: [EditCoursePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    EditCourseRoutingModule,
    CourseFormModule
  ]
})
export class EditCourseModule { }
