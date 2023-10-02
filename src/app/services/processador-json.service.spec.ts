import { TestBed } from '@angular/core/testing';

import { ProcessadorJsonService } from './processador-json.service';

describe('ProcessadorJsonService', () => {
  let service: ProcessadorJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessadorJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
