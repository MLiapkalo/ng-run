import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingStateService {
  private loadingSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoading(): Observable<boolean> {
    return this.loadingSubj.asObservable();
  }

  start(): void {
    this.loadingSubj.next(true);
  }

  finish(): void {
    this.loadingSubj.next(false);
  }
}
