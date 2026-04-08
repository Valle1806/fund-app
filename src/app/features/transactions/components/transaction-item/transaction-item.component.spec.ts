import { render, screen } from '@testing-library/angular';
import { TransactionItemComponent } from './transaction-item.component';
import { Transaction, TransactionType, NotificationMethod } from '../../../../core/models/transaction.model';
import { CopCurrencyPipe } from '../../../../core/pipes/cop-currency/cop-currency-pipe';
import { LucideAngularModule, ArrowUpRight, ArrowDownLeft, Mail, MessageSquare } from 'lucide-angular';

describe('TransactionItemComponent', () => {
  const mockTransaction: Transaction = {
    id: '1',
    amount: 50000,
    type: TransactionType.SUBSCRIPTION,
    fundId: 1,
    fundName: 'DEUDA INTERNA',
    createdAt: new Date(),
    notificationMethod: NotificationMethod.EMAIL
  };

  it('debe mostrar la información de la transacción correctamente', async () => {
    await render(TransactionItemComponent, {
      imports: [
        CopCurrencyPipe,
        LucideAngularModule.pick({ ArrowUpRight, ArrowDownLeft, Mail, MessageSquare })
      ],
      inputs: {
        transaction: mockTransaction
      }
    });

    expect(screen.getByText('DEUDA INTERNA')).toBeTruthy();
    expect(screen.getByText(/50/)).toBeTruthy();
    expect(screen.getByText('Email')).toBeTruthy();
  });

  it('debe mostrar el prefijo negativo para suscripciones', async () => {
    await render(TransactionItemComponent, {
      imports: [
        CopCurrencyPipe,
        LucideAngularModule.pick({ ArrowUpRight, ArrowDownLeft, Mail, MessageSquare })
      ],
      inputs: {
        transaction: mockTransaction
      }
    });

    expect(screen.getByText(/-.*50/)).toBeTruthy();
  });
});
