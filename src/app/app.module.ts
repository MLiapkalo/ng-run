import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CoursesPageComponent } from './components/pages/courses-page/courses-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { EditCoursePageComponent } from './components/pages/edit-course-page/edit-course-page.component';
import { AddCoursePageComponent } from './components/pages/add-course-page/add-course-page.component';
import { DurationInputComponent } from './components/inputs/duration-input/duration-input.component';
import { DateInputComponent } from './components/inputs/date-input/date-input.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { AuthorsInputComponent } from './components/inputs/authors-input/authors-input.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesPageComponent,
    HeaderComponent,
    CoursesListComponent,
    CourseCardComponent,
    BreadcrumbsComponent,
    FooterComponent,
    SearchBarComponent,
    AddCourseComponent,
    LoginPageComponent,
    EditCoursePageComponent,
    AddCoursePageComponent,
    DurationInputComponent,
    DateInputComponent,
    CourseFormComponent,
    AuthorsInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
