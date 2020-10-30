import { CourseModel } from '../models/course.model';

const randoms = {
    date: (from: Date, to: Date): Date =>
        new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime())),
    number: (min: number, max: number): number => Math.floor(Math.random() * max) + min,
    bool: (): boolean => !!Math.round(Math.random())
};

export default (() => {
    return [...Array(10)].map((_, i) => {
        return new CourseModel(
            `${i + 1}`,
            `Video course ${i + 1}`,
            randoms.date(new Date(2020, 9, 15), new Date(2020, 10, 20)),
            randoms.number(25, 90),
            `Learn about where you can find course descriptions, what information they include, how they work,
            and details about various components of a course description. Course descriptions report information about
            a university or college's classes. They're published both in course catalogs that outline degree requirements and
            in course schedules that contain descriptions for all courses offered during a particular semester.`,
            randoms.bool()
        );
    });
})();
