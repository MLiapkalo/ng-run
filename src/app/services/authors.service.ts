import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorModel } from '../shared/models/author.model';
import { ApiConfigService } from './api-config/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  constructor(
    private http: HttpClient,
    private cfg: ApiConfigService
  ) { }

  getAuthors(term = ''): Observable<AuthorModel[]> {
    let params = new HttpParams();
    if (term) {
      params = params.set('textFragment', term);
    }

    return this.http.get<AuthorModel[]>(this.cfg.authors(), { params });
  }
}
