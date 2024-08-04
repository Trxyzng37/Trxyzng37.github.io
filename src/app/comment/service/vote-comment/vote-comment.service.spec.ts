import { TestBed } from '@angular/core/testing';

import { VoteCommentService } from './vote-comment.service';

describe('VoteCommentService', () => {
  let service: VoteCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoteCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
