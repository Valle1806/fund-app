import { ActiveFund, Fund } from './../../models/fund.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { User } from '../../models/user.model';
import { NotificationMethod, Transaction, TransactionType } from '../../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class FinanceStore {
  private readonly STORAGE_KEY = 'btg_pactual_state';

  // Definición del estado inicial (Requisito: saldo de $500.000)
  private readonly initialState: User = {
    id: 'user-1',
    name: 'Cristian Vallecilla',
    balance: 500000,
    email: 'cristian.vallecilla@btg.com',
    phone: '1234567890',
    activeFunds: [],
    transactionHistory: []
  };

  // BehaviorSubject hidratado desde LocalStorage
  private readonly _state = new BehaviorSubject<User>(this.loadFromStorage());

  // Observables (Cumplimiento de Requisito Técnico)
  readonly state$ = this._state.asObservable();
  readonly balance$ = this.state$.pipe(map(s => s.balance));
  readonly portfolio$ = this.state$.pipe(map(s => s.activeFunds));
  readonly history$ = this.state$.pipe(map(s => s.transactionHistory));

  constructor() {
    this.initPersistence();
  }

  /**
   * Escucha cambios en el estado y los persiste automáticamente.
   */
  private initPersistence(): void {
    this.state$.subscribe(state => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    });
  }

  /**
   * Intenta cargar el estado previo. Si falla o no existe, retorna el inicial.
   */
  private loadFromStorage(): User {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (!saved) return this.initialState;

    try {
      const parsed = JSON.parse(saved);
      //Convertir strings de fechas a objetos Date reales
      return {
        ...parsed,
        activeFunds: parsed.activeFunds.map((f: any) => ({
          ...f,
          subscribedAt: new Date(f.subscribedAt)
        })),
        transactionHistory: parsed.transactionHistory.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt)
        }))
      };
    } catch (error) {
      console.error('Error cargando estado desde LocalStorage:', error);
      return this.initialState;
    }
  }

  /**
   * Requisito 2 y 5: Suscribirse a un fondo
   */
  subscribeToFund(fund: Fund, amount: number, method: NotificationMethod): void {
    const current = this._state.value;
    
    // Crear la transacción para el historial
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      fundId: fund.id,
      fundName: fund.name,
      type: TransactionType.SUBSCRIPTION,
      amount,
      notificationMethod: method,
      createdAt: new Date()
    };

    // Agregar al portafolio activo
    const newActiveFund: ActiveFund = {
      fund,
      subscribedAmount: amount,
      subscribedAt: new Date()
    };

    this._state.next({
      ...current,
      balance: current.balance - amount,
      activeFunds: [...current.activeFunds, newActiveFund],
      transactionHistory: [newTransaction, ...current.transactionHistory]
    });
  }

  /**
   * Requisito 3: Cancelar participación
   */
  cancelFund(fundId: number): void {
    const current = this._state.value;
    const fundToCancel = current.activeFunds.find(f => f.fund.id === fundId);
    
    if (!fundToCancel) return;

    const returnAmount = fundToCancel.subscribedAmount;
    
    const cancelTransaction: Transaction = {
      id: crypto.randomUUID(),
      fundId,
      fundName: fundToCancel.fund.name,
      type: TransactionType.CANCELLATION,
      amount: returnAmount,
      createdAt: new Date()
    };

    this._state.next({
      ...current,
      balance: current.balance + returnAmount,
      activeFunds: current.activeFunds.filter(f => f.fund.id !== fundId),
      transactionHistory: [cancelTransaction, ...current.transactionHistory]
    });
  }

  /**
   * Limpia el almacenamiento y reinicia la app
   */
  resetAll(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this._state.next(this.initialState);
  }
}