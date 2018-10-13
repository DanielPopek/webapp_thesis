import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ApplicationDTO } from "src/app/shared/model/DTO/application.dto.model";

export class ApplicationListDataSource extends DataSource<ApplicationDTO> {

  constructor(private paginator: MatPaginator, private sort: MatSort, private dataSource: ApplicationDTO[]) {
    super();

  }

  connect(): Observable<ApplicationDTO[]> {
    const rows = [];
    this.dataSource.forEach(element => rows.push(element, { detailRow: true, element }));
    console.log(rows);

    const dataMutations = [
      observableOf(rows),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.dataSource.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.dataSource]));
    }));

  }

  disconnect() {}


  private getPagedData(data: ApplicationDTO[]) {
    const startIndex = this.paginator.pageIndex * (this.paginator.pageSize*2);
    const rows = [];
    data.forEach(element => rows.push(element, { detailRow: true, element }));
    return rows.splice(startIndex, (this.paginator.pageSize*2));
  }


  private getSortedData(data: ApplicationDTO[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

   return data.sort((a, b) => {
     const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        // case 'id': return compare(+a.id, +b.id, isAsc);
        case 'date':return compare(+a.date, +b.date, isAsc);
        default: return 0;
     }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}