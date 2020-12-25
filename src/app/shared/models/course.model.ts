import { Course } from '../interfaces/course';
import { Author } from '../interfaces/User';

export class CourseModel implements Course {
    constructor(
        public id: number,
        public title: string,
        public duration: number,
        public description: string,
        public creationDate = new Date(),
        public topRated = false,
        public authors: Author[] = []
    ) {}
}
