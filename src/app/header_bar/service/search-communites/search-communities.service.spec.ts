import { TestBed } from '@angular/core/testing';

import { SearchCommunitiesService } from './search-communities.service';

describe('SearchCommunitiesService', () => {
  let service: SearchCommunitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCommunitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
