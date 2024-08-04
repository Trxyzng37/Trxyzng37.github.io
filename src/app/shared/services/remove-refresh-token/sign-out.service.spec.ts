import { TestBed } from '@angular/core/testing';

import { RemoveRefreshTokenService } from './remove-refresh-token.service';

describe('SignOutService', () => {
  let service: RemoveRefreshTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveRefreshTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
