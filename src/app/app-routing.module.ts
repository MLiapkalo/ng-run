import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './components/pages/courses-page/courses-page.component';
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
        loadChildren: () => import('./feature-modules/add-course/add-course.module').then(m => m.AddCourseModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'edit',
        data: {
          breadcrumb: 'Edit',
        },
        loadChildren: () => import('./feature-modules/edit-course/edit-course.module').then(m => m.EditCourseModule),
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
