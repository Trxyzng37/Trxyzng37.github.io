import { TestBed } from '@angular/core/testing';

import { CommunityService } from './community.service';

describe('SearchCommunitiesService', () => {
  let service: CommunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
