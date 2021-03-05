import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {PeriodicElement} from '../data.interface';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {PaginatePipe} from 'ngx-pagination';
import {AksService} from '../aks.service';
import {data} from '../data';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {

  activePage = 1;
  selectedUser: any;

  pageCount: any = [10, 30, 60, 100];
  selectedCount = 10;
  searchValue = '';
  isTable2 = false;
  isTable3 = false;
  pageIndex: number;
  count = 120;
  profilesList;
  tempposition = localStorage.getItem('position');
  splittedData = new Array<PeriodicElement[]>(3);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<PeriodicElement>;
  isSort = false;

  constructor(private paginate: PaginatePipe, private aks: AksService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.aks.searchProfile.subscribe(val => {
      if (val !== undefined) {
        this.searchValue = val;
        this.applyFilter(val);
      }
    });
    this.selectedUser = {position: 100, name: '100_name'};
    this.sort = new MatSort();
    this.sort.active = 'position';
    this.sort.direction = 'asc';
    this.defaultFilter();

  }

  defaultFilter() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.getProfileList());
    this.dataSource.sortData(data, this.sort);
    this.profilesList = this.dataSource.filteredData.slice(
      (this.activePage - 1) * this.selectedCount,
      this.activePage * this.selectedCount
    );
    this.aks.selectedProfile.next(String(this.selectedUser.position));
    this.profilesList = [this.selectedUser, ...this.dataSource.data.filter(user => user.position !== this.selectedUser.position)];
    this.appendData();
  }

  getProfileList() {
    return data;
  }


  applySort(sort: MatSort) {
    this.sort = sort;
    const data = this.searchValue === '' ? this.dataSource.data : this.dataSource.filteredData;
    const sortDatasource = new MatTableDataSource<PeriodicElement>(data);
    sortDatasource.sortData(data, this.sort);
    const page = this.activePage ? this.activePage : 1;
    this.profilesList = sortDatasource.filteredData.slice(
      (page - 1) * this.selectedCount,
      page * this.selectedCount
    );
    const selectedUser = this.profilesList.filter(user => user.position === this.selectedUser.position);
    const selectedFilterUser = data.filter(user => user.position === this.selectedUser.position);

    if (this.activePage === 1) {
      if (this.searchValue === '') {
        this.profilesList = [this.selectedUser, ...this.profilesList.filter(user => user.position !== this.selectedUser.position)];
      } else if (selectedUser.length > 0 || selectedFilterUser.length > 0) {
        this.profilesList = [this.selectedUser, ...this.profilesList.filter(user => user.position !== this.selectedUser.position)];
      }
    }
    this.appendData();
  }

  applyPagination(page: number, selecTadat?: any) {
    this.activePage = page;
    if (page === 1 && this.searchValue === '') {
      this.defaultFilter();
    } else {
      const data = this.searchValue === '' ? this.dataSource.data : this.dataSource.filteredData;
      this.profilesList = data.slice(
        (page - 1) * this.selectedCount,
        page * this.selectedCount
      );
      this.appendData();
    }

  }

  applyFilter(searchValue) {
    const filterData = new MatTableDataSource(this.dataSource.data);
    this.dataSource.filter = searchValue.trim().toLowerCase();
    this.activePage = 1;
    this.applySort(this.sort);
  }

  freshPagination() {
    this.applyPagination(1);
  }

  appendData() {
    switch (this.selectedCount) {
      case 30:
        this.splittedData[0] = this.profilesList.slice(0, 10);
        this.splittedData[1] = this.profilesList.slice(10, 20);
        this.splittedData[2] = this.profilesList.slice(20, 30);
        break;
      case 60:
        this.splittedData[0] = this.profilesList.slice(0, 20);
        this.splittedData[1] = this.profilesList.slice(20, 40);
        this.splittedData[2] = this.profilesList.slice(40, 60);
        break;
      case 100:
        this.splittedData[0] = this.profilesList.slice(0, 34);
        this.splittedData[1] = this.profilesList.slice(34, 67);
        this.splittedData[2] = this.profilesList.slice(67, 100);
        break;
      default:
        this.splittedData[0] = this.profilesList.slice(0, 10);
        break;
    }
    this.cd.markForCheck();
    this.isTable2 = this.splittedData[1]?.length > 1 ? true : false;
    this.isTable3 = this.splittedData[2]?.length > 1 ? true : false;
    if (this.selectedCount === 10) {
      this.isTable2 = false;
      this.isTable3 = false;
    }
  }


}
