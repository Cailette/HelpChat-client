import { TestBed } from '@angular/core/testing';

import { AgentSocketService } from './agent-socket.service';

describe('AgentSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentSocketService = TestBed.get(AgentSocketService);
    expect(service).toBeTruthy();
  });
});
