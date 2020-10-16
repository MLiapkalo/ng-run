import { Course } from '../interfaces/course';

export class CourseModel implements Course {
    constructor(
        public id: string,
        public title: string,
        public creationDate: string,
        public duration: number,
        public description: string
    ) {}
}