import { TestBed } from '@angular/core/testing';

import { VoteImgService } from './vote-img.service';

describe('VoteImgService', () => {
  let service: VoteImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoteImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
