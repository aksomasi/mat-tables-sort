import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements  OnChanges {
  @Input() recordCount: number;
  @Input() pageSize: number;

  @Output() page: EventEmitter<number> = new EventEmitter();

  pages: number[];
  startRange = 1;

  private pageCount: number;
  @Input() activePage: number;
  private rangeSize: number;
  private shiftSize: number;

  constructor(public cd: ChangeDetectorRef) {
    this.pageSize = this.pageSize || 10;
    this.pages = [];
    this.rangeSize = 4;
    this.shiftSize = this.rangeSize - 1;
    this.activePage = 1;
  }

  ngOnChanges() {
    this.setPageCount();
    this.setPageRange();
  }

  selectPage(event: any, pageNumber: number) {
    event.preventDefault();
    this.setActivePage(pageNumber);
  }

  previous(event: any) {
    event.preventDefault();
    const pageNumber = this.activePage - 1;
    if (this.pages.indexOf(pageNumber) === -1) {
      this.startRange = Math.max(pageNumber - this.shiftSize, 1);
      const endRange = this.startRange + this.shiftSize;
      this.setPageRange(endRange);
    }
    this.setActivePage(pageNumber);
  }

  next(event: any) {
    event.preventDefault();
    const pageNumber = this.activePage + 1;
    if (this.pages.indexOf(pageNumber) === -1) {
      const endRange = Math.min(pageNumber + this.shiftSize, this.pageCount);
      this.startRange = endRange - this.shiftSize;
      this.setPageRange(endRange);
    }
    this.setActivePage(pageNumber);
  }

  isPageActive(pageNumber: number): boolean {
    return this.activePage === pageNumber;
  }

  hide(label: string): boolean {
    const pageNumber = label === 'previous' ? 1 : this.pageCount;
    return this.isPageActive(pageNumber);
  }

  private setPageCount() {
    this.pageCount = 0;
    if (this.recordCount > 0 && this.pageSize > 0) {
      this.pageCount = Math.ceil(this.recordCount / this.pageSize);
    }
  }
  private setPageRange(endRange = this.pageCount) {
    this.pages = [];
    for (let i = this.startRange; i <= endRange; i++) {
      if (this.pages.length < this.rangeSize) {
        this.pages.push(i);
      }
    }
  }

  private setActivePage(pageNumber: number) {
    if (this.activePage !== pageNumber) {
      this.activePage = pageNumber;
      this.page.emit(this.activePage);
    }
  }

}
