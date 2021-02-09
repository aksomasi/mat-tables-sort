import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  @Input() dataSource;
  displayedColumns: string[] = ['position', 'name'];
  constructor() { }

  ngOnInit(): void {
  }

}
