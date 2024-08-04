import { TestBed } from '@angular/core/testing';

import { SavePostService } from './save-post.service';

describe('SavePostService', () => {
  let service: SavePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
