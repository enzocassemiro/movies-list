import { TestBed } from '@angular/core/testing';

import { MovieDbService } from './movie-db.service';

describe('MovieDbService', () => {
  let service: MovieDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
