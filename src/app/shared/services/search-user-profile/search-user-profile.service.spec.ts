import { TestBed } from '@angular/core/testing';

import { SearchUserProfileService } from './search-user-profile.service';

describe('SearchUserProfileService', () => {
  let service: SearchUserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchUserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
