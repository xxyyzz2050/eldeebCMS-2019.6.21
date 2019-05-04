import { TestBed } from '@angular/core/testing';

import { EldeebService } from './eldeeb.service';

describe('EldeebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EldeebService = TestBed.get(EldeebService);
    expect(service).toBeTruthy();
  });
});
