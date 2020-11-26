import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './components/pages/courses-page/courses-page.component';
import { AddCoursePageComponent } from './components/pages/add-course-page/add-course-page.component';
import { EditCoursePageComponent } from './components/pages/edit-course-page/edit-course-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page.component';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { 
    path: 'courses',
    data: {
      breadcrumb: 'Courses',
    },
    children: [
      {
        path: '', 
        data: {
          breadcrumb: null,
        },
        component: CoursesPageComponent
      },
      { 
        path: 'add',
        data: {
          breadcrumb: 'Add',
        }, 
        component: AddCoursePageComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'edit/:id',
        data: {
          breadcrumb: 'Edit',
        }, 
        component: EditCoursePageComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { 
    path: 'login',
    data: {
      breadcrumb: 'Login',
    }, 
    component: LoginPageComponent 
  },
  { 
    path: '**', 
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
