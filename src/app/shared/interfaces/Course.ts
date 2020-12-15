export interface Course {
  id: number;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
  topRated: boolean;
}

export interface CourseDTO {
  id: number;
  name: string;
  date: string;
  length: number;
  description: string;
  // optional for now
  authors?: Array<{
    id: number;
    name: string;
  }>;
  isTopRated: boolean;
}

export interface CoursesSlice {
  list: Course[];
  hasNext?: boolean;
}

export interface CoursesDTOSlice {
  list: CourseDTO[];
  hasNext?: boolean;
}

export type FetchCoursesBehavior = 'append' | 'set';
export type RequiredCourseProps = Pick<Course, 'title' | 'description' | 'duration'>;
export type OptionalCourseProps = Partial<Pick<Course, 'creationDate' | 'topRated'>>;
