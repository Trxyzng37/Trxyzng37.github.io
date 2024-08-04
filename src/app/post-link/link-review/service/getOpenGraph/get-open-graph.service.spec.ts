import { TestBed } from '@angular/core/testing';

import { GetOpenGraphService } from './get-open-graph.service';

describe('GetOpenGraphService', () => {
  let service: GetOpenGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOpenGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
