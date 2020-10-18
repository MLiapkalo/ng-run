import { CourseModel } from '../models/course.model';

export default (() => {
    return [...Array(10)].map((_, i) => {
        return new CourseModel(
            `${i + 1}`,
            `Video course ${i + 1}`,
            new Date().toISOString(),
            60,
            `Learn about where you can find course descriptions, what information they include, how they work,
            and details about various components of a course description. Course descriptions report information about
            a university or college's classes. They're published both in course catalogs that outline degree requirements and
            in course schedules that contain descriptions for all courses offered during a particular semester.`
        );
    });
})();
