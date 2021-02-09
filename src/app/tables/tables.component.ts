import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {PeriodicElement} from '../data.interface';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {


  pageCount: any = [10, 30, 60, 100];
  selectedCount = 10;
  searchValue: string;
  isTable2 = false;
  isTable3 = false;
  pageIndex: number;
  count = 10;
  updatedData;
  splittedData = new Array<PeriodicElement[]>(3);

  dataSource: MatTableDataSource<PeriodicElement>;

  constructor() {
    this.increaseData();
  }

  appendData() {

    switch (this.selectedCount) {
      case 30:
        this.splittedData[0] = this.updatedData.slice(0, 10);
        this.splittedData[1] = this.updatedData.slice(10, 20);
        this.splittedData[2] = this.updatedData.slice(20, 30);
        break;
      case 60:
        this.splittedData[0] = this.updatedData.slice(0, 20);
        this.splittedData[1] = this.updatedData.slice(20, 40);
        this.splittedData[2] = this.updatedData.slice(40, 60);
        break;
      case 100:
        this.splittedData[0] = this.updatedData.slice(0, 34);
        this.splittedData[1] = this.updatedData.slice(34, 67);
        this.splittedData[2] = this.updatedData.slice(67, 100);
        break;
      default:
        this.splittedData[0] = this.updatedData.slice(0, 10);
        break;
    }

    this.isTable2 = this.splittedData[1]?.length > 1 ? true : false;
    this.isTable3 = this.splittedData[2]?.length > 1 ? true : false;


  }

  // tslint:disable-next-line:typedef
  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
    this.updatedData = this.dataSource.filteredData;
    this.appendData();

  }

  ngOnInit(): void {
  }

  increaseData() {
    const data: PeriodicElement[] = [];
    for (let line = 0; line < this.count; line++) {
      data.push({position: line + 1, name: line + 1 + '_Name'});
    }
    this.dataSource = new MatTableDataSource(data);

    this.updatedData = this.dataSource.data;
    this.appendData();

  }
}

const StartIndex = {
  10: 0,
  30: 20,
  60: 30,
  100: 100,
};
const EndIndex = {
  10: 10,
  30: 20,
  60: 30,
  100: 100,
};
