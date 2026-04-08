import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FinanceFacade } from '../../core/facades/finance-facade/finance-facade';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
/**
 * Componente de historial de transacciones.
 *
 * Cada transacción se muestra con `TransactionItemComponent` y si no hay datos,
 * se ve un estado vacío con `EmptyStateComponent`. Acá orquesto los datos y la UI
 * sin meter lógica de negocio extra.
 *
 * Esta vista la hice usando el observable directo con AsyncPipe para mostrar que sé manejar
 * tanto la forma moderna con signals como la forma tradicional con observables.
 */
@Component({
  selector: 'btg-transactions',
  imports: [ CommonModule, LucideAngularModule, TransactionItemComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="btg-card flex flex-col h-full min-h-[500px]">
    
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-bold flex items-center gap-2">
          <lucide-icon name="clock" class="w-5 h-5" style="color: var(--btg-cyan)"></lucide-icon>
          Historial de Actividad
        </h2>
        <span class="text-[0.6rem] uppercase tracking-widest font-bold" style="color: var(--btg-text-muted)">
          Movimientos Recientes
        </span>
      </div>

      <div class="flex-1 overflow-y-auto pr-1 custom-scrollbar relative">

        @for (transaction of (financeFacade.history$ | async); track transaction.id) {
          
          <btg-transaction-item [transaction]="transaction" />
          
        } @empty {
          
          <btg-empty-state 
            title="Sin movimientos" 
            description="Aquí verás el registro de tus inversiones y retiros de capital."
            icon="mailbox"
          />
          
        }
      </div>

    </section>  
  `,
})
export class TransactionsPage {
 public financeFacade = inject(FinanceFacade);
}
