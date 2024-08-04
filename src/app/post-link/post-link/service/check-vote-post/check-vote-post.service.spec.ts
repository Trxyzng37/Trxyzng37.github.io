import { TestBed } from '@angular/core/testing';

import { CheckVotePostService } from './check-vote-post.service';

describe('CheckVotePostService', () => {
  let service: CheckVotePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckVotePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
