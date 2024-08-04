import { TestBed } from '@angular/core/testing';

import { CheckShowPostService } from './check-show-post.service';

describe('CheckShowPostService', () => {
  let service: CheckShowPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckShowPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
