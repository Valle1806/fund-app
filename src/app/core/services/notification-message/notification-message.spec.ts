import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NotificationService } from './notification-message';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('debe agregar una notificación', (done) => {
    service.notify('Test Message', 'success');
    
    service.notifications$.subscribe(notifications => {
      expect(notifications.length).toBe(1);
      expect(notifications[0].message).toBe('Test Message');
      expect(notifications[0].type).toBe('success');
      done();
    });
  });

  it('debe eliminar una notificación automáticamente después de 5 segundos', fakeAsync(() => {
    service.notify('Auto Dismiss');
    
    tick(5100);
    
    service.notifications$.subscribe(notifications => {
      expect(notifications.length).toBe(0);
    });
  }));
});
