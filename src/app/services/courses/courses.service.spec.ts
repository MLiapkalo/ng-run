import { PipeTransform } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { FilterByPipe } from '../../shared/pipes/filter-by/filter-by.pipe';
import { COURSES_MOCK } from '../../shared/mocks/courses.mock';
import { CourseModel } from '../../shared/models/course.model';
import { 
  Course,
  RequiredCourseProps
} from '../../shared//interfaces/course';

const TITLE = 'test';
const DESCRIPTION = 'test description';
const DURATION = 30;
const CREATION_DATE = new Date(2020, 10, 11);
const TOP_RATED = true;

const REQUIRED_COURSE_PAYLOAD: RequiredCourseProps = {
  title: TITLE,
  description: DESCRIPTION,
  duration: DURATION
};

class FilterByPipeMock implements PipeTransform {
  transform(list: Course[], _: any, term: string) {
    return list.filter(({ title }) => title === term)
  } 
}

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FilterByPipe,
          useClass: FilterByPipeMock
        },
        {
          provide: COURSES_MOCK,
          useValue: [
            new CourseModel('1', 'first', 45, 'first description', new Date(2020, 10, 9), true),
            new CourseModel('2', 'second', 25, 'second description', new Date(2020, 10, 10), true),
            new CourseModel('3', 'third', 90, 'third description', new Date(2020, 10, 7), false),
          ]
        }
      ]
    });
    service = TestBed.inject(CoursesService);
  });

  it('should return the list', () => {
    expect(service.getList().length).toBe(3);
  });

  it('should create the course with only required props provided', () => {
    const createdCourse = service.createCourse(REQUIRED_COURSE_PAYLOAD);
    expect(createdCourse.title).toBe(TITLE, 'should have correct title');
    expect(createdCourse.description).toBe(DESCRIPTION, 'should have correct description');
    expect(createdCourse.duration).toBe(DURATION, 'should have correct duration');
    expect(createdCourse.creationDate).not.toBe(CREATION_DATE, 'should have current date as creation date');
    expect(createdCourse.topRated).toBeFalse();
  });

  it('createCourse: should create the course with required props and creation date provided', () => {
    const createdCourse = service.createCourse({
      ...REQUIRED_COURSE_PAYLOAD,
      creationDate: CREATION_DATE
    });
    expect(createdCourse.creationDate).toBe(CREATION_DATE, 'should have provided date as creation date');
  });

  it('createCourse: should create the course with required props and top rated flag provided', () => {
    const createdCourse = service.createCourse({
      ...REQUIRED_COURSE_PAYLOAD,
      topRated: TOP_RATED
    });
    expect(createdCourse.topRated).toBeTrue();
  });

  it('createCourse: should append created course to the list', () => {
    const createdCourse = service.createCourse(REQUIRED_COURSE_PAYLOAD);
    const list = service.getList();
    expect(list[list.length - 1]).toBe(createdCourse);
  });

  it('should find courses by provided title', () => {
    const term = 'first';
    const res = service.getByTitle(term);
    expect(res.length).toBe(1);
    expect(res[0].title).toBe(term)
  });

  it('getById: should get course by id if course with provided id exists', () => {
    expect(service.getById('3')).toBeTruthy();
  });

  it('getById: should return null if course with provided id does not exists', () => {
    expect(service.getById('invalid id')).toBeNull();
  });

  it('deleteById: should delete course by id if course with this id exists', () => {
    const id = '2';
    expect(service.getById(id)).toBeTruthy();
    service.deleteById(id)
    expect(service.getById(id)).toBeNull();
  });

  it('updateById: should return updated course', () => {
    const id = '1';
    const changes = {
      title: 'updated'
    };    
    const updatedCourse = service.updateById(id, changes);
    expect(updatedCourse.title).toBe(changes.title);
  });

  it('updateById: should update course if it exists', () => {
    const id = '1';
    const changes = {
      title: 'updated',
      duration: 120
    };

    const beforeUpdate = service.getById(id);
    expect(beforeUpdate.title).toBe('first');
    expect(beforeUpdate.duration).toBe(45);
    
    service.updateById(id, changes);

    const updatedCourse = service.getById(id);
    expect(updatedCourse.title).toBe(changes.title);
    expect(updatedCourse.duration).toBe(changes.duration);
    expect(updatedCourse.description).toBe(beforeUpdate.description);
  });

  it('updateById: should do nothing if course with provided id does not exist', () => {
    const id = 'invalid id';
    const changes = {
      title: 'updated'
    };

    const listBeforeUpdate = service.getList();
    service.updateById(id, changes);
    const listAfterUpdate = service.getList();

    expect(listBeforeUpdate).toEqual(listAfterUpdate);
  });
});
