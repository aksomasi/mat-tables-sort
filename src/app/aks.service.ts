import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AksService {

  selectedProfile: BehaviorSubject<string> = new BehaviorSubject<string>('');

  searchProfile: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);


  constructor() { }
}
