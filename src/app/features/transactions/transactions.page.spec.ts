import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { TransactionsPage } from './transactions.page';
import { FinanceFacade } from '../../core/facades/finance-facade/finance-facade';
import { Transaction, TransactionType, NotificationMethod } from '../../core/models/transaction.model';
import { LucideAngularModule, Clock, Search, Mailbox, ArrowUpRight, ArrowDownLeft, Mail, MessageSquare, TrendingUp } from 'lucide-angular';
import { CopCurrencyPipe } from '../../core/pipes/cop-currency/cop-currency-pipe';
import { provideRouter } from '@angular/router';

describe('TransactionsPage', () => {
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      amount: 50000,
      type: TransactionType.SUBSCRIPTION,
      fundId: 1,
      fundName: 'DEUDA INTERNA',
      createdAt: new Date(),
      notificationMethod: NotificationMethod.EMAIL
    },
    {
      id: '2',
      amount: 30000,
      type: TransactionType.CANCELLATION,
      fundId: 2,
      fundName: 'ACCIONES LATAM',
      createdAt: new Date(),
      notificationMethod: NotificationMethod.SMS
    }
  ];

  it('debe renderizar el historial de transacciones correctamente', async () => {
    const mockFacade = {
      history$: of(mockTransactions)
    };

    await render(TransactionsPage, {
      imports: [
        CopCurrencyPipe,
        LucideAngularModule.pick({ Clock, Search, Mailbox, ArrowUpRight, ArrowDownLeft, Mail, MessageSquare, TrendingUp })
      ],
      providers: [
        { provide: FinanceFacade, useValue: mockFacade },
        provideRouter([])
      ]
    });

    expect(screen.getByText('DEUDA INTERNA')).toBeTruthy();
    expect(screen.getByText('ACCIONES LATAM')).toBeTruthy();
    expect(screen.getByText(/50/)).toBeTruthy();
    expect(screen.getByText(/30/)).toBeTruthy();
    expect(screen.getByText(/Fondos/i)).toBeTruthy();
  });

  it('debe mostrar el estado vacío y el botón de comenzar si no hay transacciones', async () => {
    const mockFacadeEmpty = {
      history$: of([])
    };

    await render(TransactionsPage, {
      imports: [
        CopCurrencyPipe,
        LucideAngularModule.pick({ Clock, Search, Mailbox, ArrowUpRight, ArrowDownLeft, Mail, MessageSquare, TrendingUp })
      ],
      providers: [
        { provide: FinanceFacade, useValue: mockFacadeEmpty },
        provideRouter([])
      ]
    });

    expect(screen.getByText('Sin movimientos')).toBeTruthy();
    expect(screen.getByText(/¡Comenzar a Invertir!/i)).toBeTruthy();
  });
});
