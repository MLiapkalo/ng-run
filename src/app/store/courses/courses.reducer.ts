import { ActionReducer, createReducer, on } from '@ngrx/store';
import { Course } from '../../shared/interfaces/Course';
import * as actions from './courses.actions';

export const featureKey = 'courses';

export interface State {
  list: Course[];
  count: number;
  page: number;
  start: number;
  hasNext: boolean;
  isLoading: boolean;
  getError: boolean;
  deleteError: boolean;
}

const INITIAL_PAGE = 1;
const INITIAL_START = 0;

export const initialState: State = {
  list: [],
  count: 5,
  page: INITIAL_PAGE,
  start: INITIAL_START,
  hasNext: false,
  getError: false,
  isLoading: false,
  deleteError: false
};

export const reducer: ActionReducer<State> = createReducer(
  initialState,
  on(actions.loadCourses, state => ({ ...state, isLoading: true, error: false })),
  on(actions.loadCoursesFailure, state => ({ ...state, isLoading: false, getError: true })),
  on(actions.setCourses, (state, { data }) => ({
    ...state,
    list: data,
    isLoading: false
  })),
  on(actions.appendCourses, (state, { data }) => ({
    ...state,
    list: [...state.list, ...data],
    isLoading: false
  })),
  on(actions.deleteCourse, (state, { data: courseId }) => ({ ...state, isLoading: true })),
  on(actions.deleteCourseSuccess, (state, { data: courseId }) => ({
    ...state,
    list: state.list.filter(({ id }) => id !== courseId),
    isLoading: false,
    deleteError: false
  })),
  on(actions.deleteCourseFailure, state => ({ ...state, isLoading: false, deleteError: true })),
  on(actions.toNextPage, state => ({ ...state, page: state.page + 1 })),
  on(actions.resetPagination, state => ({ ...state, page: INITIAL_PAGE, start: INITIAL_START })),
  on(actions.setHasNextFlag, (state, { data }) => ({ ...state, hasNext: data })),
  on(actions.computeStartPointer, state => ({
    ...state,
    start: state.count * state.page + 1
  })),
);

