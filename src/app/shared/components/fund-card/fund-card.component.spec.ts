import { render, screen, fireEvent } from '@testing-library/angular';
import { FundCardComponent } from './fund-card.component';
import { Fund, FundCategory } from '../../../core/models/fund.model';
import { CopCurrencyPipe } from '../../../core/pipes/cop-currency/cop-currency-pipe';

describe('FundCardComponent', () => {
  const mockFund: Fund = {
    id: 1,
    name: 'DEUDA_INTERNA',
    category: FundCategory.FIC,
    minimumAmount: 50000
  };

  it('debe mostrar la información del fondo correctamente', async () => {
    await render(FundCardComponent, {
      imports: [CopCurrencyPipe],
      inputs: {
        fund: mockFund,
        isSubscribed: false
      }
    });

    // El nombre formateado reemplaza guiones por espacios
    expect(screen.getByText('DEUDA INTERNA')).toBeTruthy();
    expect(screen.getByText('FIC')).toBeTruthy();
    // El pipe de moneda debe funcionar
    expect(screen.getByText(/50/)).toBeTruthy();
  });

  it('debe mostrar el botón de suscribirse cuando no está suscrito', async () => {
    await render(FundCardComponent, {
      imports: [CopCurrencyPipe],
      inputs: {
        fund: mockFund,
        isSubscribed: false
      }
    });

    expect(screen.getByText('Subscribime')).toBeTruthy();
    expect(screen.queryByText('Cancelar participación')).toBeNull();
  });

  it('debe mostrar el botón de cancelar cuando está suscrito', async () => {
    await render(FundCardComponent, {
      imports: [CopCurrencyPipe],
      inputs: {
        fund: mockFund,
        isSubscribed: true
      }
    });

    expect(screen.getByText('Cancelar participación')).toBeTruthy();
    expect(screen.queryByText('Subscribime')).toBeNull();
  });

  it('debe emitir el evento subscribe al hacer clic en el botón', async () => {
    let emittedFund: Fund | undefined;
    await render(FundCardComponent, {
      imports: [CopCurrencyPipe],
      inputs: {
        fund: mockFund,
        isSubscribed: false
      },
      on: {
        subscribe: (ev: any) => emittedFund = ev
      }
    });

    fireEvent.click(screen.getByText('Subscribime'));
    expect(emittedFund).toEqual(mockFund);
  });
});
