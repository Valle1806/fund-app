import { TestBed } from '@angular/core/testing';

import { FinanceFacade } from './finance-facade';

describe('FinanceFacade', () => {
  let service: FinanceFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
