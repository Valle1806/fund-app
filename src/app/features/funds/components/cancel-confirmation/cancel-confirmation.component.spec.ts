import { render, screen, fireEvent } from '@testing-library/angular';
import { LucideAngularModule, TriangleAlert } from 'lucide-angular';
import { CancelConfirmationComponent } from './cancel-confirmation.component';
import { Fund, FundCategory } from '../../../../core/models/fund.model';

describe('CancelConfirmationComponent', () => {
  const mockFund: Fund = {
    id: 1,
    name: 'DEUDA INTERNA',
    category: FundCategory.FIC,
    minimumAmount: 50000
  };

  it('debe renderizar el mensaje de confirmación con el nombre del fondo', async () => {
    await render(CancelConfirmationComponent, {
      imports: [LucideAngularModule.pick({ TriangleAlert })],
      inputs: {
        fund: mockFund
      }
    });

    expect(screen.getByText(/DEUDA INTERNA/)).toBeTruthy();
  });

  it('debe emitir confirmCancel al hacer clic en el botón de confirmar', async () => {
    let confirmed = false;
    await render(CancelConfirmationComponent, {
      imports: [LucideAngularModule.pick({ TriangleAlert })],
      inputs: {
        fund: mockFund
      },
      on: {
        confirmCancel: () => confirmed = true
      }
    });

    fireEvent.click(screen.getByText(/Confirmar Cancelación/i));
    
    // por el timeout del componente de 1200ms
    await new Promise(res => setTimeout(res, 1500));
    expect(confirmed).toBeTrue();
  });
});
