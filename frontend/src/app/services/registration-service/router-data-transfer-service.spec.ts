import { TestBed } from '@angular/core/testing';

import { RouterDataTransferServiceService } from './router-data-transfer-service.service';

describe('RouterDataTransferServiceService', () => {
  let service: RouterDataTransferServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterDataTransferServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
