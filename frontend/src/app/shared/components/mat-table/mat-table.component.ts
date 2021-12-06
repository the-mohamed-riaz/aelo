import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'material-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['type', 'amount', 'category', 'date', 'time'];
  dataSource = new MatTableDataSource<TableElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface TableElement {
  type: boolean;
  amount: number;
  category: string;
  date: string;
  time: string;

}

const ELEMENT_DATA: TableElement[] = [
  {
    type: false, amount: 2001, category: "food", date: "2021-02-25", time: "12:45"
  },
  {
    type: false, amount: 2153, category: "food", date: "2021-02-25", time: "12:45"
  },
  {
    type: true, amount: 6212, category: "food", date: "2021-02-25", time: "12:45"
  },
  {
    type: false, amount: 800, category: "food", date: "2021-02-25", time: "12:45"
  },
  {
    type: true, amount: 14, category: "food", date: "2021-02-25", time: "12:45"
  },
];
