import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FinanceFacade } from './finance-facade';
import { FinanceStore } from '../../store/finance-store/finance.store';
import { NotificationService } from '../../services/notification-message/notification-message';
import { Router } from '@angular/router';
import { Fund, FundCategory } from '../../models/fund.model';
import { NotificationMethod } from '../../models/transaction.model';

describe('FinanceFacade', () => {
  let service: FinanceFacade;
  let storeSpy: jasmine.SpyObj<FinanceStore>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('FinanceStore', ['subscribeToFund', 'cancelFund', 'resetAll'], {
      balance$: of(100000),
      portfolio$: of([]),
      history$: of([])
    });
    notificationSpy = jasmine.createSpyObj('NotificationService', ['notify']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        FinanceFacade,
        { provide: FinanceStore, useValue: storeSpy },
        { provide: NotificationService, useValue: notificationSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(FinanceFacade);
  });

  it('debe llamar a subscribeToFund del store', () => {
    const mockFund: Fund = { id: 1, name: 'Fondo', category: FundCategory.FIC, minimumAmount: 50000 };
    service.subscribe(mockFund, 60000, 'EMAIL' as NotificationMethod);
    expect(storeSpy.subscribeToFund).toHaveBeenCalledWith(mockFund, 60000, 'EMAIL' as NotificationMethod);
  });

  it('debe llamar a cancelFund del store', () => {
    service.cancel(1);
    expect(storeSpy.cancelFund).toHaveBeenCalledWith(1);
  });

  it('debe resetear la cuenta y notificar', () => {
    service.resetAccount();
    expect(storeSpy.resetAll).toHaveBeenCalled();
    expect(notificationSpy.notify).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/funds']);
  });
});
