import {
  Component,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { Course, FetchCoursesBehavior } from '../../shared/interfaces/course';
import { ListOrdering } from '../../shared/enums/listOrdering';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { Observable, Subject } from 'rxjs';
import {skip, takeUntil} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  deleteCourse,
  resetPagination,
  toNextPage,
  computeStartPointer,
  loadCourses
} from '../../store/courses/courses.actions';
import * as fromCourses from '../../store/courses/courses.selectors';
import { getTerm } from '../../store/search';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @Input()
  order: ListOrdering = ListOrdering.Desc;
  @Input()
  orderByKey: keyof Course = 'creationDate';

  hasNext: Observable<boolean> = this.store.select(fromCourses.getHasNextFlag);
  list: Observable<Course[]> = this.store.select(fromCourses.getCoursesList);
  isLoading: Observable<boolean> = this.store.select(fromCourses.getIsLoadingFlag);
  getCoursesError: Observable<boolean> = this.store.select(fromCourses.getCoursesErrorFlag);
  deleteCourseError: Observable<boolean> = this.store.select(fromCourses.deleteCourseErrorFlag);
  searchTerm: Observable<string> = this.store.select(getTerm) as Observable<string>;

  constructor(
    private coursesService: CoursesService,
    private store: Store
  ) {}

  private computeStart(): void {
    this.store.dispatch(computeStartPointer());
  }

  private loadCourses(behavior: FetchCoursesBehavior): void {
    this.store.dispatch(loadCourses({ behavior }));
  }

  private toNextPage(): void {
    this.store.dispatch(toNextPage());
  }

  private resetPagination(): void {
    this.store.dispatch(resetPagination());
  }

  ngOnInit(): void {
    this.loadCourses('set');
    this.computeStart();

    this.searchTerm.pipe(
      skip(1),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.resetPagination();
      this.loadCourses('set');
    });

    this.getCoursesError.pipe(takeUntil(this.destroy$)).subscribe(flag => {
      if (flag) alert('Oops, can\'t retrieve courses');
    });

    this.deleteCourseError.pipe(takeUntil(this.destroy$)).subscribe(flag => {
      if (flag) alert('Oops, unable to delete this course');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  deleteCourse(id: number): void {
    if (confirm('Do you really want to delete this course?')) {
      this.store.dispatch(deleteCourse({ data: id }));
    }
  }

  onLoadMore(): void {
    this.computeStart();
    this.loadCourses('append');
    this.toNextPage();
  }
}
