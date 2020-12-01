import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  Input,
  SimpleChanges
} from '@angular/core';
import { Course } from '../../shared/interfaces/course';
import { ListOrdering } from '../../shared/enums/listOrdering';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy, OnChanges {
  private readonly initialStartPointer = 0;
  private readonly initialPage = 1;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private startPointer = this.initialStartPointer;
  private page = this.initialPage;
  private count = 5;

  @Input()
  searchTerm = '';
  @Input()
  order: ListOrdering = ListOrdering.Desc;
  @Input()
  orderByKey: keyof Course = 'creationDate';

  hasNext = false;
  list: Course[] = [];

  constructor(
    private coursesService: CoursesService
  ) {}

  private fetchCoursesPage(append = false): void {
    this.coursesService.getList({
      start: this.startPointer,
      count: this.count,
      term: this.searchTerm
    }).pipe(takeUntil(this.destroy$))
      .subscribe(({ list, hasNext }) => {
        this.list = append ? [...this.list, ...list] : list;
        this.hasNext = hasNext;
      });
  }

  private get computedStart(): number {
    return this.count * this.page + 1;
  }

  private toNextPage(): void {
    this.page++;
    this.startPointer = this.computedStart;
  }

  private resetPagination(): void {
    this.startPointer = this.initialStartPointer;
    this.page = this.initialPage;
  }

  ngOnInit(): void {
    this.fetchCoursesPage();
    this.startPointer = this.computedStart;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('searchTerm')) {
      this.resetPagination();
      this.fetchCoursesPage();
      this.startPointer = this.computedStart;
    }
  }

  deleteCourse(id: number): void {
    if (confirm('Do you really want to delete this course?')) {
      this.coursesService.deleteById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.list = this.list.filter(({ id: courseId }) => courseId !== id),
          error: err => alert(err)
        });
    }
  }

  onLoadMore(): void {
    this.fetchCoursesPage(true);
    this.toNextPage();
  }
}
