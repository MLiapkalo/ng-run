import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AddCourseComponent } from './components/add-course/add-course.component';

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
    AddCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
