import { Injectable } from '@angular/core';
import {
  Course,
  CourseDTO,
  CoursesSlice,
  CoursesDTOSlice
} from '../../shared/interfaces/course';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../api-config/api-config.service';
import { DTOToCourse } from '../../mappers/course.mapper';
import { SliceParams } from '../../shared/interfaces/SliceParams';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(
    private http: HttpClient,
    private cfg: ApiConfigService
  ) {}

  private constructQueryParams({ start, count, term }: SliceParams): HttpParams {
    let params = new HttpParams();

    if (start) {
      params = params.set('start', start.toString());
    }

    if (count) {
      params = params.set('count', count.toString());
    }

    if (term) {
      params = params.set('textFragment', term);
    }

    return params;
  }

  private mapCoursesDTOSlice({ list, hasNext }: CoursesDTOSlice): CoursesSlice {
    return { list: list.map(DTOToCourse), hasNext };
  }

  getList(params: SliceParams): Observable<CoursesSlice> {
    return this.http.get<CoursesDTOSlice>(this.cfg.courses(), {
      params: this.constructQueryParams(params)
    }).pipe(map(this.mapCoursesDTOSlice));
  }

  createCourse(payload: CourseDTO): Observable<Course> {
    return this.http.post<CourseDTO>(this.cfg.courses(), JSON.stringify(payload)).pipe(map(DTOToCourse));
  }

  getById(id: string): Observable<Course> {
    return this.http.get<CourseDTO>(this.cfg.course(id)).pipe(map(DTOToCourse));
  }

  updateById(id: number, changes: CourseDTO): Observable<Course> {
    return this.http.patch<CourseDTO>(this.cfg.course(id), JSON.stringify(changes)).pipe(map(DTOToCourse));
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<CourseDTO>(this.cfg.course(id));
  }
}
