import { TestBed } from '@angular/core/testing';

import { DesignerStateServiceService } from './designer-state-service.service';

describe('DesignerStateServiceService', () => {
  let service: DesignerStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignerStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
