import { TestBed } from '@angular/core/testing';

import { VotePostService } from './vote-post.service';

describe('VotePostService', () => {
  let service: VotePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
