import { TestBed } from '@angular/core/testing';

import { EditUserInfoService } from './edit-user-info.service';

describe('EditUserInfoService', () => {
  let service: EditUserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
