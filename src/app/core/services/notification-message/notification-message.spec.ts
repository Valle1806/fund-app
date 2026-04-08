import { TestBed } from '@angular/core/testing';

import { NotificationMessage } from './notification-message';

describe('NotificationMessage', () => {
  let service: NotificationMessage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationMessage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
