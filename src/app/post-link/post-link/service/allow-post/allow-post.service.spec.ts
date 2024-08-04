import { TestBed } from '@angular/core/testing';

import { AllowPostService } from './allow-post.service';

describe('AllowPostService', () => {
  let service: AllowPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllowPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
