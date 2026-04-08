import { TestBed } from '@angular/core/testing';
import { FinanceStore } from './finance.store';
import { Fund, FundCategory } from '../../models/fund.model';
import { NotificationMethod, TransactionType } from '../../models/transaction.model';

describe('FinanceStore', () => {
  let store: FinanceStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [FinanceStore]
    });
    store = TestBed.inject(FinanceStore);
  });

  it('debe inicializar con el estado por defecto si no hay nada en storage', (done) => {
    store.balance$.subscribe(balance => {
      expect(balance).toBe(500000);
      done();
    });
  });

  it('debe permitir suscribirse a un fondo y actualizar el balance', (done) => {
    const mockFund: Fund = { id: 1, name: 'Fondo Test', category: FundCategory.FIC, minimumAmount: 50000 };
    
    store.subscribeToFund(mockFund, 60000, NotificationMethod.EMAIL);

    store.state$.subscribe(state => {
      expect(state.balance).toBe(440000); // 500000 - 60000
      expect(state.activeFunds.length).toBe(1);
      expect(state.activeFunds[0].fund.id).toBe(1);
      expect(state.transactionHistory.length).toBe(1);
      expect(state.transactionHistory[0].type).toBe(TransactionType.SUBSCRIPTION);
      done();
    });
  });

  it('debe permitir cancelar un fondo y devolver el dinero al balance', (done) => {
    const mockFund: Fund = { id: 1, name: 'Fondo Test', category: FundCategory.FIC, minimumAmount: 50000 };
    store.subscribeToFund(mockFund, 60000, NotificationMethod.EMAIL);

    store.cancelFund(1);

    store.state$.subscribe(state => {
      expect(state.balance).toBe(500000); // 440000 + 60000
      expect(state.activeFunds.length).toBe(0);
      expect(state.transactionHistory.length).toBe(2); // Suscripción + Cancelación
      expect(state.transactionHistory[0].type).toBe(TransactionType.CANCELLATION);
      done();
    });
  });
});
