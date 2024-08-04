import { TestBed } from '@angular/core/testing';

import { PassCodeService } from './pass-code.service';

describe('PassCodeService', () => {
  let service: PassCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
