import { TestBed } from '@angular/core/testing';

import { CheckRefreshTokenService } from './check-refresh-token.service';

describe('CheckRefreshTokenService', () => {
  let service: CheckRefreshTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckRefreshTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
