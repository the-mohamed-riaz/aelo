import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { $data, $dropdown_option } from '../editable-dropdown/editable-dropdown.component';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Optional() public dialogRef: MatDialogRef<TableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: $data,
  ) {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): any {
    this.dialogRef.close(this.options);
  }

  ngOnInit(): void {
    this.options.sort((val1, val2) => (val1.name > val2.name ? 1 : -1));
  }
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  options: Array<$dropdown_option> = this.data.options;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.options.push({ name: value, value: value.toLowerCase().replace(/ /g, "_") });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(val: $dropdown_option): void {
    const index = this.options.findIndex((v: $dropdown_option) => v.value === val.value);

    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
