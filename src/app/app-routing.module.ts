import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './components/pages/courses-page/courses-page.component';
import { AddCoursePageComponent } from './components/pages/add-course-page/add-course-page.component';
import { EditCoursePageComponent } from './components/pages/edit-course-page/edit-course-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses/add', component: AddCoursePageComponent },
  { path: 'courses/edit/:id', component: EditCoursePageComponent },
  { path: 'courses', component: CoursesPageComponent },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
