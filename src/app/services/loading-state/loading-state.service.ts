import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingStateService {
  private loadingFlagSub: Subscription;
  private loadingStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  observeFlag(loadingFlagObservable: Observable<boolean>): void {
    this.loadingFlagSub = loadingFlagObservable.subscribe(value => {
      this.loadingStateSubject.next(value);
    });
  }

  leaveFlag(): void {
    this.loadingFlagSub.unsubscribe();
  }

  isLoading(): Observable<boolean> {
    return this.loadingStateSubject.asObservable();
  }
}
