import { Component, OnInit } from '@angular/core';
import {AksService} from '../aks.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchValue: any;
  constructor(private aks: AksService) { }

  ngOnInit(): void {
  }
  applyFilter(){
this.aks.searchProfile.next(this.searchValue);
  }
}
