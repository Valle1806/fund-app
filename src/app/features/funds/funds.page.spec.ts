import { render, screen, fireEvent, waitFor } from '@testing-library/angular';
import { of } from 'rxjs';
import { FundsPage } from './funds.page';
import { FundService } from '../../core/services/fund/fund.service';
import { FinanceFacade } from '../../core/facades/finance-facade/finance-facade';
import { NotificationService } from '../../core/services/notification-message/notification-message';
import { Fund, FundCategory } from '../../core/models/fund.model';
import { CopCurrencyPipe } from '../../core/pipes/cop-currency/cop-currency-pipe';
import { LucideAngularModule, TrendingUp, History, Clock, Search, Mailbox, TriangleAlert, Loader2 } from 'lucide-angular';

describe('FundsPage', () => {
  const mockFunds: Fund[] = [
    { id: 1, name: 'DEUDA INTERNA', category: FundCategory.FIC, minimumAmount: 50000 },
    { id: 2, name: 'ACCIONES LATAM', category: FundCategory.FPV, minimumAmount: 100000 }
  ];

  const mockFundService = {
    getFunds: () => of(mockFunds)
  };

  const mockFacade = {
    isFundActive$: (id: number) => of(false),
    balance$: of(200000),
    cancel: jasmine.createSpy('cancel')
  };

  const mockNotificationService = {
    notify: jasmine.createSpy('notify')
  };

  it('debe renderizar la lista de fondos correctamente', async () => {
    await render(FundsPage, {
      imports: [
        CopCurrencyPipe,
        LucideAngularModule.pick({ TrendingUp, History, Clock, Search, Mailbox, TriangleAlert, Loader2 })
      ],
      providers: [
        { provide: FundService, useValue: mockFundService },
        { provide: FinanceFacade, useValue: mockFacade },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    });

    expect(screen.getByText('DEUDA INTERNA')).toBeTruthy();
    expect(screen.getByText('ACCIONES LATAM')).toBeTruthy();
  });

  it('debe abrir el modal de suscripción al hacer clic en Subscribime', async () => {
    await render(FundsPage, {
      imports: [
        CopCurrencyPipe,
        LucideAngularModule.pick({ TrendingUp, History, Clock, Search, Mailbox, TriangleAlert, Loader2 })
      ],
      providers: [
        { provide: FundService, useValue: mockFundService },
        { provide: FinanceFacade, useValue: mockFacade },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    });

    const subscribeButtons = screen.getAllByText('Subscribime');
    fireEvent.click(subscribeButtons[0]);

    expect(screen.getByText(/Invertir en DEUDA INTERNA/i)).toBeTruthy();
  });

  it('debe abrir el modal de cancelación al hacer clic en Cancelar participación', async () => {
    const mockFacadeSubscribed = {
      ...mockFacade,
      isFundActive$: (id: number) => of(id === 1)
    };

    await render(FundsPage, {
      imports: [
        CopCurrencyPipe,
        LucideAngularModule.pick({ TrendingUp, History, Clock, Search, Mailbox, TriangleAlert, Loader2 })
      ],
      providers: [
        { provide: FundService, useValue: mockFundService },
        { provide: FinanceFacade, useValue: mockFacadeSubscribed },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    });

    const cancelButtons = screen.getAllByText('Cancelar participación');
    fireEvent.click(cancelButtons[0]);

    expect(screen.getByText(/Confirmar Retiro/i)).toBeTruthy();
  });
});
