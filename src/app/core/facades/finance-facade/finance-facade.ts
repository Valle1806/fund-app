import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FinanceStore } from '../../store/finance-store/finance.store';
import { NotificationMethod } from '../../models/transaction.model';
import { Fund } from '../../models/fund.model';
/**
 * Este servicio aplica el patrón Facade para exponer de manera sencilla
 * las operaciones financieras de la aplicación y desacoplar los componentes
 * del FinanceStore.  
 * 
 * Permite acceder a observables como balance, portafolio e historial,
 * verificar si un fondo está activo, y ejecutar acciones como suscribirse
 * o cancelar fondos, sin que los componentes tengan que manejar directamente
 * la lógica interna del store.  
 * 
 * De esta manera, centraliza la interacción con el estado financiero,
 * mantiene el código más limpio y facilita el mantenimiento.
 */
@Injectable({ providedIn: 'root' })
export class FinanceFacade {
  private store = inject(FinanceStore);

  // Observables para el consumo en componentes (Async Pipe)
  readonly balance$ = this.store.balance$;
  readonly portfolio$ = this.store.portfolio$;
  readonly history$ = this.store.history$;

  // Verifica si un fondo ya está en el portafolio
  isFundActive$(fundId: number): Observable<boolean> {
    return this.portfolio$.pipe(
      map(activeFunds => activeFunds.some(f => f.fund.id === fundId))
    );
  }

  subscribe(fund: Fund, amount: number, method: NotificationMethod) {
    this.store.subscribeToFund(fund, amount, method);
  }

  cancel(fundId: number) {
    this.store.cancelFund(fundId);
  }
}