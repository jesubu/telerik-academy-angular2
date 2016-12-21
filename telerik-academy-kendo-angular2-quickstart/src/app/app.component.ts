import { Component, Injectable, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent,
} from '@progress/kendo-angular-grid';

import { toODataString, SortDescriptor } from '@progress/kendo-data-query';

@Injectable()
export class CategoryService extends BehaviorSubject<GridDataResult> {
  private BASE_URL: string = 'http://services.odata.org/V4/Northwind/Northwind.svc/Products';

  constructor(private http: Http) {
    super(null);
  }

  public query(state): void {
    this.fetch(state).subscribe(x => super.next(x));
  }

  private fetch(state: any): Observable<GridDataResult> {
      const queryStr = `${toODataString(state)}&$count=true`;
      return this.http
          .get(`${this.BASE_URL}?${queryStr}`)
          .map(response => response.json())
          .map(response => (<GridDataResult>{
              data: response.value,
              total: parseInt(response["@odata.count"], 10)
          }));
    }
}

@Component({
  providers: [CategoryService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private view: Observable<GridDataResult>;
    private pageSize: number = 5;
    private skip: number  = 0;
    private sort: SortDescriptor[] = [];

    @ViewChild(GridComponent) private grid: GridComponent;

    constructor(private service: CategoryService) {
        this.view = service;
        this.service.query({ skip: this.skip, take: this.pageSize, sort: this.sort });
    }

    public ngAfterViewInit(): void {
        this.grid.dataStateChange
            .do(({ skip, take, sort }: DataStateChangeEvent) => {
                this.skip = skip;
                this.pageSize = take;
                this.sort = sort;
            })
            .subscribe(x => this.service.query(x));
    }

    public getTotalUnits() {
      if (this.grid.data) {
        return this.grid.data['data'].reduce((result, current) => result += current.UnitsInStock, 0);
      }
    }
}
