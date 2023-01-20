import { TestBed } from '@angular/core/testing';

import { CoWinService } from './co-win.service';

describe('CoWinService', () => {
  let service: CoWinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoWinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
