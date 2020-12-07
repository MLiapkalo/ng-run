import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingStateService } from 'src/app/services/loading-state/loading-state.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  loading: Observable<boolean>;

  constructor(
    private loadingStateService: LoadingStateService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingStateService.isLoading();
  }
}
