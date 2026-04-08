import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Transaction, TransactionType, NotificationMethod } from '../../../../core/models/transaction.model';
import { CopCurrencyPipe } from '../../../../core/pipes/cop-currency/cop-currency-pipe';
/**
 * Componente de ítem de transacción (presentational).
 *
 * Muestra los datos de una transacción de manera clara:
 * tipo (suscripción o retiro), monto, fecha, fondo y método de notificación.
 *
 * Todo el componente se basa en los datos que recibe vía `transaction` y 
 * no maneja lógica de negocio ni llamadas a servicios.  
 * Usa `computed` para calcular iconos, colores y prefijos, dejando el template
 * limpio y declarativo.
 *
 */
@Component({
  selector: 'btg-transaction-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, CopCurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="btg-transaction-item animate-in slide-in-from-right-2 duration-300">
      
      <div 
        class="btg-transaction-icon"
        [ngClass]="iconColor()"
      >
        <lucide-icon 
          [name]="icon()" 
          class="w-5 h-5">
        </lucide-icon>
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <p class="text-sm font-semibold truncate" style="color: var(--btg-text)">
            {{ transaction().fundName }}
          </p>
          <span class="text-[0.6rem] font-mono opacity-40 uppercase tracking-tighter">
            ID #{{ transaction().id.toString().slice(0, 8) }}
          </span>
        </div>
        <div class="flex items-center gap-2 mt-0.5">
          <span class="text-[0.7rem]" style="color: var(--btg-text-muted)">
            {{ transaction().createdAt | date:'MMM d, h:mm a' }}
          </span>
          
          @if (transaction().notificationMethod) {
            <span style="color: var(--btg-border)">•</span>
            <lucide-icon 
              [name]="notificationIcon()" 
              class="w-3 h-3"
              style="color: var(--btg-text-muted)">
            </lucide-icon>
            <span class="text-[0.7rem] capitalize" style="color: var(--btg-text-muted)">
                {{ notificationLabel() }}
              </span>
          }
        </div>
      </div>

      <div class="text-right">
        <p 
          class="text-sm font-bold"
          [ngClass]="amountColor()"
        >
          {{ amountPrefix() }}{{ transaction().amount | copCurrency }}
        </p>
        <p class="text-[0.6rem] uppercase font-black opacity-30">COP</p>
      </div>
    </div>
  `
})
export class TransactionItemComponent {
  transaction = input.required<Transaction>();

  readonly icon = computed(() =>
    this.transaction().type === TransactionType.SUBSCRIPTION ? 'arrow-up-right' : 'arrow-down-left'
  );

  readonly iconColor = computed(() =>
    this.transaction().type === TransactionType.SUBSCRIPTION
      ? 'bg-amber-500/10 text-amber-400'
      : 'bg-emerald-500/10 text-emerald-400'
  );

  readonly amountPrefix = computed(() =>
    this.transaction().type === TransactionType.SUBSCRIPTION ? '-' : '+'
  );

  readonly amountColor = computed(() =>
    this.transaction().type === TransactionType.SUBSCRIPTION ? 'text-amber-400' : 'text-emerald-400'
  );

  readonly notificationIcon = computed(() =>
    this.transaction().notificationMethod === NotificationMethod.EMAIL ? 'mail' : 'message-square'
  );

  readonly notificationLabel = computed(() =>
    this.transaction().notificationMethod === NotificationMethod.EMAIL ? 'Email' : 'SMS'
  );
}