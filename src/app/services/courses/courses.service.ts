import { Injectable, Inject } from '@angular/core';
import { 
  Course, 
  RequiredCourseProps, 
  OptionalCourseProps
} from '../../shared/interfaces/course';
import { CourseModel } from '../../shared/models/course.model';
import { FilterByPipe } from '../../shared/pipes/filter-by/filter-by.pipe';
import { COURSES_MOCK } from 'src/app/shared/mocks/courses.mock';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(
    private filterBy: FilterByPipe,
    @Inject(COURSES_MOCK) private _courses: Course[]
  ) {}
  
  private get courseId(): string {
    const { _courses: c } = this;
    const { id } = c[c.length - 1];
    return `${+id + 1}`;
  }

  private findIndexById(id: string) {
    return this._courses.findIndex(({ id: courseId }) => courseId === id);
  }

  getList(): Course[] {
    return this._courses.slice();
  }

  createCourse(props: RequiredCourseProps & OptionalCourseProps): Course {
    const { title, description, duration, creationDate = new Date(), topRated = false } = props;
    const newCourse = new CourseModel(this.courseId, title, duration, description, creationDate, topRated);
    this._courses.push(newCourse);
    return newCourse;
  }

  getById(id: string): Course {
    const course = this._courses.find(({ id: courseId }) => courseId === id);
    return course ? { ...course } : null;
  }

  getByTitle(term: string): Course[] {
    return this.filterBy.transform(this._courses, 'title', term);
  }

  updateById(id: string, changes: Partial<Course> = {}): Course {
    const i = this.findIndexById(id);
    if (i > - 1) {
      let target = this._courses[i];
      this._courses[i] = {
        ...target,
        ...changes
      };
      return this._courses[i];
    } else return null;
  }

  deleteById(id: string): void {
    const i = this.findIndexById(id);
    if (i > -1) this._courses.splice(i, 1);
  }

  count() {
    return this._courses.length;
  }
}
