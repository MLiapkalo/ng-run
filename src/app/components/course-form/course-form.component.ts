import { Component, Input } from '@angular/core';
import { Course } from 'src/app/shared/interfaces/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  @Input()
  course: Course = {
    id: '',
    title: '',
    description: '',
    duration: 0,
    creationDate: null,
    topRated: false
  };
}
