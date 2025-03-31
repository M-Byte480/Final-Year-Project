import { TestBed } from '@angular/core/testing';

import { TriggerDeployStateChangeService } from './trigger-deploy-state-change.service';

describe('TriggerDeployStateChangeService', () => {
  let service: TriggerDeployStateChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriggerDeployStateChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
