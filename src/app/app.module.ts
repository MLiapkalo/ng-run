import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import HttpInterceptors from './http-interceptors';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { CoursesPageComponent } from './components/pages/courses-page/courses-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

import { reducers } from './store';
import { CustomRouterSerializer } from './store/router';
import { CoursesEffects } from './store/courses/courses.effects';
import { AuthEffects } from './store/auth/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    CoursesPageComponent,
    HeaderComponent,
    CoursesListComponent,
    CourseCardComponent,
    BreadcrumbsComponent,
    SearchBarComponent,
    AddCourseComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterSerializer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([CoursesEffects, AuthEffects]),
  ],
  providers: [HttpInterceptors, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
