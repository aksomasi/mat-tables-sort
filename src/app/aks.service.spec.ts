import { TestBed } from '@angular/core/testing';

import { AksService } from './aks.service';

describe('AksService', () => {
  let service: AksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
