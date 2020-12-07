import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { CourseDTO } from 'src/app/shared/interfaces/course';
import { CoursesService } from '../../services/courses/courses.service';
import { generateUID } from '../../mappers/course.mapper';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  @Input()
  mode: 'create' | 'edit' = 'create';

  @Input()
  payload: CourseDTO = {
    id: this.mode === 'create' ? generateUID() : null,
    name: '',
    description: '',
    length: 0,
    date: new Date().toString(),
    isTopRated: false,
    authors: [this.defaultAuthor]
  };

  constructor(
    private coursesService: CoursesService,
    private authService: AuthService,
    private location: Location
  ) {}

  private doPost(): void {
    this.coursesService.createCourse(this.payload).subscribe(
      ({ id }) => alert(`Course ${id} created`),
      error => console.error(error)
    );
  }

  private doPatch(): void {
    this.coursesService.updateById(this.payload.id, this.payload).subscribe(
      ({ id }) => alert(`Course ${id} updated`),
      error => console.error(error)
    );
  }

  private get defaultAuthor(): { id: number, name: string } {
    const { id, name: { first, last } } = this.authService.getUserInfo();
    return { id, name: `${first} ${last}` };
  }

  onSubmit(): void {
    this.mode === 'create' ? this.doPost() : this.doPatch();
  }

  navigateBack(): void {
    this.location.back();
  }
}
