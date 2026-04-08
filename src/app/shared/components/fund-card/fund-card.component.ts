import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { CopCurrencyPipe } from '../../../core/pipes/cop-currency/cop-currency-pipe';
import { Fund } from '../../../core/models/fund.model';
/**
 * Componente de tarjeta de fondo (dumb/presentational).
 * 
 * Su único trabajo es mostrar la información del fondo: categoría, nombre,
 * inversión mínima y si el usuario ya está suscrito.  
 * Dependiendo de eso, muestra el botón para suscribirse o cancelar participación.
 * 
 * No contiene lógica de negocio ni llamadas a servicios; todo lo maneja el
 * componente padre. Solo recibe datos y emite eventos según la acción del usuario.
 *
 * Es un componente reutilizable centrado únicamente en la UI.
 */
@Component({
  selector: 'btg-fund-card',
  imports: [CommonModule, BadgeComponent, CopCurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="btg-card flex flex-col justify-between h-full transition-transform active:scale-[0.98]"
    >
      <div class="space-y-3">
        <div class="flex justify-between items-start">
          <btg-badge
            [label]="fund().category"
            [variant]="fundData().category === 'FPV' ? 'fpv' : 'fic'"
          />
          @if (isSubscribed()) {
            <span class="text-[10px] font-black text-[#00b4d8] uppercase tracking-widest"
              >Suscrito</span
            >
          }
        </div>

        <h3 class="text-sm font-bold leading-tight" style="color: var(--btg-text)">
          {{ formattedName() }}
        </h3>

        <div class="pt-2">
          <p class="text-[10px] uppercase font-bold" style="color: var(--btg-text-muted)">
            Inversión mínima
          </p>
          <p class="text-lg font-black" style="color: var(--btg-cyan)">
            {{ fundData().minimumAmount | copCurrency }}
          </p>
        </div>
      </div>

      <div class="mt-6">
        @if (isSubscribed()) {
          <button (click)="cancel.emit(fund().id)" class="btg-btn btg-btn-danger btg-btn-full">
            Cancelar participación
          </button>
        } @else {
          <button (click)="subscribe.emit(fund())" class="btg-btn btg-btn-primary btg-btn-full">
            Subscribirse
          </button>
        }
      </div>
    </div>
  `,
})
export class FundCardComponent {
  fund = input.required<Fund>();
  isSubscribed = input<boolean>(false);

  subscribe = output<Fund>();
  cancel = output<number>();

  readonly formattedName = computed(() => this.fund().name.replaceAll('_', ' '));
  readonly fundData = computed(() => this.fund());
}
