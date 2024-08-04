import { TestBed } from '@angular/core/testing';

import { GetCommentStatusService } from './get-comment-status.service';

describe('GetCommentStatusService', () => {
  let service: GetCommentStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCommentStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
