import {
  Course,
  CourseDTO
} from '../shared/interfaces/Course';

// for mocking purposes, StackOverflow copy-paste
export function generateUID(): number {
  // tslint:disable-next-line:no-bitwise
  return Math.random() * 4665 | 0;
}

export const courseToDTO = (payload: Course): CourseDTO => {
  if (!payload) return null;

  const { id, title, description, duration, creationDate = new Date(), topRated = false } = payload;
  return {
    id,
    name: title,
    description,
    length: duration,
    date: creationDate.toString(),
    isTopRated: topRated
  };
};

export const DTOToCourse = (dto: CourseDTO): Course => {
  const { id, name, description, length, date = new Date(), isTopRated = false } = dto;
  return {
    id,
    title: name,
    description,
    duration: length,
    creationDate: new Date(date),
    topRated: isTopRated
  };
};
