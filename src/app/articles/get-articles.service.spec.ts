import { TestBed } from '@angular/core/testing';

import { GetArticlesService } from './get-articles.service';

describe('GetArticlesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetArticlesService = TestBed.get(GetArticlesService);
    expect(service).toBeTruthy();
  });
});
