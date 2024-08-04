import { TestBed } from '@angular/core/testing';

import { CreateCommunityService } from './create-community.service';

describe('CreateCommunityService', () => {
  let service: CreateCommunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCommunityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
