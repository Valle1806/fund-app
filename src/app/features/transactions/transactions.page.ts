import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FinanceFacade } from '../../core/facades/finance-facade/finance-facade';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { RouterLink } from '@angular/router';
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
  imports: [ CommonModule, LucideAngularModule, TransactionItemComponent, EmptyStateComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="btg-card flex flex-col h-full min-h-[500px]">
    
      <div class="flex items-center justify-between mb-6">
        <div class="flex flex-col gap-1">
          <h2 class="text-lg font-bold flex items-center gap-2">
            <lucide-icon name="clock" class="w-5 h-5" style="color: var(--btg-cyan)"></lucide-icon>
            Historial de Actividad
          </h2>
          <span class="text-[0.6rem] uppercase tracking-widest font-bold" style="color: var(--btg-text-muted)">
            Movimientos Recientes
          </span>
        </div>
        
        <a routerLink="/funds" class="btg-btn btg-btn-primary text-xs flex items-center gap-2 h-9 px-4 shadow-lg shadow-cyan-500/20">
          <lucide-icon name="trending-up" class="w-4 h-4"></lucide-icon>
          Fondos
        </a>
      </div>

      <div class="flex-1 overflow-y-auto pr-1 custom-scrollbar relative">

        @for (transaction of (financeFacade.history$ | async); track transaction.id) {
          
          <btg-transaction-item [transaction]="transaction" />
          
        } @empty {
          
          <div class="flex flex-col items-center">
            <btg-empty-state 
              title="Sin movimientos" 
              description="Aquí verás el registro de tus inversiones y retiros de capital."
              icon="mailbox"
            />
            <a routerLink="/funds" class="btg-btn btg-btn-primary px-8 h-12 mt-4 text-sm font-bold shadow-xl shadow-cyan-500/20">
              ¡Comenzar a Invertir!
            </a>
          </div>
          
        }
      </div>

    </section>  
  `,
})
export class TransactionsPage {
 public financeFacade = inject(FinanceFacade);
}
