import { TestBed } from '@angular/core/testing';

import { RecentVisitService } from './recent-visit.service';

describe('RecentVisitService', () => {
  let service: RecentVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
