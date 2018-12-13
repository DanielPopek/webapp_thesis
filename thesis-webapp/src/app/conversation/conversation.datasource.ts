import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ConversationDTO } from "src/app/shared/model/DTO/conversation.dto.model";

export class ConversationListDataSource extends DataSource<ConversationDTO> {




  constructor(private paginator: MatPaginator, private sort: MatSort, private dataSource: ConversationDTO[]) {
    super();

  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ConversationDTO[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const rows = [];
    this.dataSource.forEach(element => rows.push(element, { detailRow: true, element }));
    console.log(rows);

    const dataMutations = [
      observableOf(rows),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.dataSource.length;

    //data.forEach(element => rows.push(element, { detailRow: true, element }));

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.dataSource]));
    }));

  }


  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ConversationDTO[]) {
    const startIndex = this.paginator.pageIndex * (this.paginator.pageSize * 2);
    const rows = [];
    data.forEach(element => rows.push(element, { detailRow: true, element }));
    return rows.splice(startIndex, (this.paginator.pageSize * 2));
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ConversationDTO[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        case 'lastModificationDate': return compare(+a.lastModificationDate, +b.lastModificationDate, isAsc);
        case 'creationDate': return compare(+a.creationDate, +b.creationDate, isAsc);
        case 'conversationHash': return compare(+a.conversationHash, +b.conversationHash, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}