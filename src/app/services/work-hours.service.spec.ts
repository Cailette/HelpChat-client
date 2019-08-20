import { TestBed } from '@angular/core/testing';

import { WorkHoursService } from './work-hours.service';

describe('WorkHoursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkHoursService = TestBed.get(WorkHoursService);
    expect(service).toBeTruthy();
  });
});
