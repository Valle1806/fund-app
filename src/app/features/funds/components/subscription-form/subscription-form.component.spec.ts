import { render, screen } from '@testing-library/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SubscriptionFormComponent } from './subscription-form.component';
import { FinanceFacade } from '../../../../core/facades/finance-facade/finance-facade';
import { NotificationService } from '../../../../core/services/notification-message/notification-message';
import { Fund, FundCategory } from '../../../../core/models/fund.model';

describe('SubscriptionFormComponent', () => {
  const mockFund: Fund = {
    id: 1,
    name: 'DEUDA INTERNA',
    category: FundCategory.FIC,
    minimumAmount: 50000
  };

  const mockFacade = {
    balance$: of(100000),
    subscribe: jasmine.createSpy('subscribe')
  };

  const mockNotificationService = {
    notify: jasmine.createSpy('notify')
  };

  it('debe inicializar el formulario con el monto mínimo del fondo', async () => {
    await render(SubscriptionFormComponent, {
      imports: [ReactiveFormsModule],
      providers: [
        { provide: FinanceFacade, useValue: mockFacade },
        { provide: NotificationService, useValue: mockNotificationService }
      ],
      inputs: {
        fund: mockFund
      }
    });

    const amountInput = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(Number(amountInput.value)).toBe(mockFund.minimumAmount);
  });
});
