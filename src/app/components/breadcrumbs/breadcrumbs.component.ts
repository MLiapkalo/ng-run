import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Breadcrumb } from '../../shared/interfaces/Breadcrumb';
import { BreadcrumbsService } from '../../services/breadcrumbs/breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(
    private readonly breadcrumbsService: BreadcrumbsService
  ) {}
  
  ngOnInit() {
    this.breadcrumbs$ = this.breadcrumbsService.ofBreadcrumbs();
  }
}
