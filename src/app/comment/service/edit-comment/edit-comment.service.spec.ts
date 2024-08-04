import { TestBed } from '@angular/core/testing';

import { EditCommentService } from './edit-comment.service';

describe('EditCommentService', () => {
  let service: EditCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
