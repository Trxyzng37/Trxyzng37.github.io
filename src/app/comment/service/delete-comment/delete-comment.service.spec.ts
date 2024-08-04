import { TestBed } from '@angular/core/testing';

import { DeleteCommentService } from './delete-comment.service';

describe('DeleteCommentService', () => {
  let service: DeleteCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
