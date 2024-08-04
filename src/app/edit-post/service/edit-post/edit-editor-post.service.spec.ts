import { TestBed } from '@angular/core/testing';

import { EditEditorPostService } from './edit-editor-post.service';

describe('EditEditorPostService', () => {
  let service: EditEditorPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditEditorPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
