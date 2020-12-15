import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCourseRoutingModule } from './add-course-routing.module';
import { AddCoursePageComponent } from './components/add-course-page/add-course-page.component';
import { SharedModule } from '../../shared/shared.module';
import { CourseFormModule } from '../course-form/course-form.module';

@NgModule({
  declarations: [AddCoursePageComponent],
  imports: [
    CommonModule,
    AddCourseRoutingModule,
    SharedModule,
    CourseFormModule
  ],
})
export class AddCourseModule { }
