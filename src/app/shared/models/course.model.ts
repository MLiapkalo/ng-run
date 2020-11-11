import { Course } from '../interfaces/course';

export class CourseModel implements Course {
    constructor(
        public id: string,
        public title: string,
        public duration: number,
        public description: string,
        public creationDate = new Date(),
        public topRated = false
    ) {}
}