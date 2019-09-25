import { TestBed } from '@angular/core/testing';

import { VisitorSocketService } from './visitor-socket.service';

describe('VisitorSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisitorSocketService = TestBed.get(VisitorSocketService);
    expect(service).toBeTruthy();
  });
});
