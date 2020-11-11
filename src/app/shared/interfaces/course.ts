export interface Course {
    id: string;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated: boolean;
}

export type RequiredCourseProps = Pick<Course, 'title' | 'description' | 'duration'>;
export type OptionalCourseProps = Partial<Pick<Course, 'creationDate' | 'topRated'>>;
