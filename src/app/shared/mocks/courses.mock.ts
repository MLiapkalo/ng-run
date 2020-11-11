import { InjectionToken } from '@angular/core';
import { Course } from '../interfaces/course';

export const COURSES_MOCK = new InjectionToken<Course[]>('courses list mock');

export const COURSES_LIST: Course[] = [
  {
    id: '1',
    title: 'Video course 1',
    creationDate: new Date('2020-10-25T06:28:11.347Z'),
    duration: 76,
    description: "Learn about where you can find course descriptions, what information they include, how they work,\n        and details about various components of a course description. Course descriptions report information about\n        a university or college's classes. They're published both in course catalogs that outline degree requirements and\n        in course schedules that contain descriptions for all courses offered during a particular semester.",
    topRated: true
  },
  {
    id: '2',
    title: 'Video course 2',
    creationDate: new Date('2020-10-29T15:04:44.949Z'),
    duration: 74,
    description: "Learn about where you can find course descriptions, what information they include, how they work,\n        and details about various components of a course description. Course descriptions report information about\n        a university or college's classes. They're published both in course catalogs that outline degree requirements and\n        in course schedules that contain descriptions for all courses offered during a particular semester.",
    topRated: false
  },
  {
    id: '3',
    title: 'Video course 3',
    creationDate: new Date('2020-10-25T11:06:17.304Z'),
    duration: 69,
    description: "Learn about where you can find course descriptions, what information they include, how they work,\n        and details about various components of a course description. Course descriptions report information about\n        a university or college's classes. They're published both in course catalogs that outline degree requirements and\n        in course schedules that contain descriptions for all courses offered during a particular semester.",
    topRated: true
  },
  {
    id: '4',
    title: 'Video course 4',
    creationDate: new Date('2020-10-17T00:07:42.952Z'),
    duration: 71,
    description: "Learn about where you can find course descriptions, what information they include, how they work,\n        and details about various components of a course description. Course descriptions report information about\n        a university or college's classes. They're published both in course catalogs that outline degree requirements and\n        in course schedules that contain descriptions for all courses offered during a particular semester.",
    topRated: false
  },
  {
    id: '5',
    title: 'Video course 5',
    creationDate: new Date('2020-11-16T01:48:27.765Z'),
    duration: 94,
    description: "Learn about where you can find course descriptions, what information they include, how they work,\n        and details about various components of a course description. Course descriptions report information about\n        a university or college's classes. They're published both in course catalogs that outline degree requirements and\n        in course schedules that contain descriptions for all courses offered during a particular semester.",
    topRated: false
  },
  {
    id: '6',
    title: 'Video course 6',
    creationDate: new Date('2020-11-14T01:36:23.060Z'),
    duration: 46,
    description: "Learn about where you can find course descriptions, what information they include, how they work,\n        and details about various components of a course description. Course descriptions report information about\n        a university or college's classes. They're published both in course catalogs that outline degree requirements and\n        in course schedules that contain descriptions for all courses offered during a particular semester.",
    topRated: false
  },
  {
    id: '7',
    title: 'Video course 7',
    creationDate: new Date('2020-11-02T04:11:19.738Z'),
    duration: 70,
    description: "Learn about where you can find course descriptions, what information they include, how they work,\n        and details about various components of a course description. Course descriptions report information about\n        a university or college's classes. They're published both in course catalogs that outline degree requirements and\n        in course schedules that contain descriptions for all courses offered during a particular semester.",
    topRated: true
  },
  {
    id: '8',
    title: 'Video course 8',
    creationDate: new Date('2020-11-03T05:32:37.670Z'),
    duration: 48,
    description: "Learn about where you can find course descriptions, what information they include, how they work,\n        and details about various components of a course description. Course descriptions report information about\n        a university or college's classes. They're published both in course catalogs that outline degree requirements and\n        in course schedules that contain descriptions for all courses offered during a particular semester.",
    topRated: false
  },
  {
    id: '9',
    title: 'Video course 9',
    creationDate: new Date('2020-10-26T09:36:03.460Z'),
    duration: 27,
    description: "Learn about where you can find course descriptions, what information they include, how they work,\n        and details about various components of a course description. Course descriptions report information about\n        a university or college's classes. They're published both in course catalogs that outline degree requirements and\n        in course schedules that contain descriptions for all courses offered during a particular semester.",
    topRated: true
  },
  {
    id: '10',
    title: 'Video course 10',
    creationDate: new Date('2020-10-25T02:54:01.038Z'),
    duration: 96,
    description: "Learn about where you can find course descriptions, what information they include, how they work,\n        and details about various components of a course description. Course descriptions report information about\n        a university or college's classes. They're published both in course catalogs that outline degree requirements and\n        in course schedules that contain descriptions for all courses offered during a particular semester.",
    topRated: false
  }
];
