import { TestBed } from '@angular/core/testing';

import { SendPostService } from './send-post.service';

describe('SendPostService', () => {
  let service: SendPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
