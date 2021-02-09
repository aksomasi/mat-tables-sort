import {Component, ViewChild} from '@angular/core';
import {PeriodicElement} from './data.interface';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isTable2 = false;
  isTable3 = false;
  pageIndex: number;
  originalData;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<PeriodicElement>;

  title = 'mat-tables';
  count = 0;

  splittedData = new Array<PeriodicElement[]>(3);


  constructor() {
    this.pageIndex = 30;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.originalData = ELEMENT_DATA;
    this.appendData(this.dataSource.data);


    /* this.pageIndex = 30;
     if (this.pageIndex === 30 && data.length <= 30) {
       this.splittedData = this.getDataSources(this.dataSource._pageData(this.dataSource.data));
     }*/
    /*if (x.length > 10) {
      this.isTable2 = true;
    }
    if (x.length > 20) {
      this.isTable3 = true;
    }
    if (x.length > 30) {
      this.splittedData = this.getDataSources(this.dataSource._pageData(this.dataSource.data));
    } else {
      this.splittedData = [this.dataSource.data, [], []];
    }*/
    // console.log(this.splittedData);
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngAfterViewInit() {
    /*this.dataSource.paginator = this.paginator;
    // console.log(this.dataSource._pageData(this.dataSource.data));
    const x = this.dataSource.data;

    if (x.length > 30) {
      this.splittedData = this.getDataSources(this.dataSource._pageData(this.dataSource.data));
    } else {
      this.splittedData = [this.dataSource.data, [], []];
    }*/
    /*   if (this.splittedData[0].length <= 10) {
         const sl = this.splittedData[0].length;
         const s = 30 - sl;
         for (let i = 0; i < sl; i++) {
           this.splittedData.push([]);
         }
       }*/
    //  this.dataSource.sort = this.sort;
  }

  changePageIndex(event, data) {
    this.pageIndex = event.pageSize;
    this.appendData(this.dataSource.data);
  }

  appendData(data) {
    this.splittedData[0] = new Array(PrintIndex[this.pageIndex]);
    this.splittedData[1] = new Array(PrintIndex[this.pageIndex]);
    this.splittedData[2] = new Array(PrintIndex[this.pageIndex]);
    this.splittedData = this.get(PrintIndex[this.pageIndex], data);
    const table1Data = this.splittedData[0];
    if (table1Data.length < PrintIndex[this.pageIndex]) {
      const x = PrintIndex[this.pageIndex] - table1Data.length;
      for (let i = 0; i < x; i++) {
        this.splittedData[0].push({position: undefined, name: ''});
      }
    }
    if (this.splittedData.length > 1) {
      this.isTable2 = this.splittedData[1].length >= 1 ? true : false;
      if (this.splittedData[1].length >= PrintIndex[this.pageIndex]) {
        this.isTable2 = true;
        const table2Data = this.splittedData[1];
        if (table2Data.length < PrintIndex[this.pageIndex]) {
          const x = PrintIndex[this.pageIndex] - table2Data.length;
          for (let i = 0; i < x; i++) {
            this.splittedData[1].push({position: undefined, name: ''});
          }
        }
      }
      if (this.splittedData.length > 2) {
        this.isTable3 = this.splittedData[2].length >= 1 ? true : false;
        if (this.splittedData[2].length >= PrintIndex[this.pageIndex]) {
          this.isTable3 = true;
          const table3Data = this.splittedData[2];
          if (table3Data.length < PrintIndex[this.pageIndex]) {
            const x = PrintIndex[this.pageIndex] - table3Data.length;
            for (let i = 0; i < x; i++) {
              this.splittedData[2].push({position: undefined, name: ''});
            }
          }
        }
      }

    } else {
      this.isTable2 = false;
      this.isTable3 = false;
    }

    console.log(this.splittedData.length);


  }

  get(size, data) {


    var arrays = [];

    while (data.length > 0) {
      arrays.push(data.splice(0, size));
    }
    return arrays;
    console.log(arrays);
  }

  getDataSources(data: any): PeriodicElement[] [] {
    const n = 3;
    const result = [[], [], []];

    const wordsPerLine = Math.ceil(data.length / 3);
    for (let line = 0; line < n; line++) {
      for (let i = 0; i < wordsPerLine; i++) {
        const value = data[i + line * wordsPerLine];
        if (!value) {
          continue;
        } // avoid adding "undefined" values
        result[line].push(value);
      }
    }

    var arrays = [], size = 3;

    while (data.length > 0) {
      arrays.push(data.splice(0, size));
    }

    console.log(arrays);
    return arrays;
  }

  increaseData() {
    const data: PeriodicElement[] = [];
    for (let line = 0; line < this.count; line++) {
      data.push({position: line + 1, name: line + 1 + '_Name'});
    }
    this.dataSource = new MatTableDataSource(data);
    /*  const x = this.dataSource.data;
      if (x.length > 10) {
        this.isTable2 = true;
      }
      if (x.length > 20) {
        this.isTable3 = true;
      }

      if (x.length > 30) {
        this.splittedData = this.getDataSources(this.dataSource._pageData(this.dataSource.data));
      } else {
        this.splittedData = [this.dataSource.data, [], []];
      }*/
    this.originalData = this.dataSource.data;
    this.appendData(this.dataSource.data);
  }
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen'},
  {position: 2, name: 'Helium'},
  {position: 3, name: 'Lithium'},
  {position: 4, name: 'Beryllium'},
  {position: 5, name: 'Boron'},
  {position: 6, name: 'Carbon'},
  {position: 7, name: 'Nitrogen'},
  {position: 8, name: 'Oxygen'},
  {position: 9, name: 'Fluorine'},
  {position: 10, name: 'Neon'},
];

const PrintIndex = {
  30: 10,
  60: 20,
  90: 30,
};
