import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FundCardComponent } from '../../shared/components/fund-card/fund-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { FundService } from '../../core/services/fund/fund.service';
import { tap } from 'rxjs';
import { Fund } from '../../core/models/fund.model';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SubscriptionFormComponent } from './components/subscription-form/subscription-form.component';
import { FinanceFacade } from '../../core/facades/finance-facade/finance-facade';
import { CancelConfirmationComponent } from './components/cancel-confirmation/cancel-confirmation.component';
import { NotificationService } from '../../core/services/notification-message/notification-message';

/**
 * Componente de la página de Fondos que permite al usuario explorar
 * los fondos disponibles, invertir en ellos o cancelar sus suscripciones.
 * 
 * Usa FinanceFacade para verificar fondos activos y coordina la apertura
 * de modales de suscripción y cancelación, manejando estados de carga
 * y selección de fondos de forma reactiva.
 */
@Component({
  selector: 'btg-funds',
  standalone: true,
  imports: [
    CommonModule,
    FundCardComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ModalComponent,
    SubscriptionFormComponent,
    CancelConfirmationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <header>
        <h1 class="text-2xl font-black">Explorar Fondos</h1>
        <p class="text-sm" style="color: var(--btg-text-muted)">
          Selecciona el fondo que mejor se adapte a tus objetivos.
        </p>
      </header>

      @if (isLoading()) {
        <btg-loading-spinner message="Consultando fondos disponibles..." />
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (fund of funds(); track fund.id) {
            <btg-fund-card
              [fund]="fund"
              [isSubscribed]="(facade.isFundActive$(fund.id) | async) || false"
              (subscribe)="onOpenSubscription($event)"
              (cancel)="onOpenCancellation(fund)"
            />
          } @empty {
            <div class="col-span-full">
              <btg-empty-state
                title="No se encontraron fondos"
                description="Intenta recargar la página o volver más tarde."
                icon="search-x"
              />
            </div>
          }
        </div>
      }
      @if (selectedFund()) {
        <btg-modal
          [title]="'Invertir en ' + selectedFund()?.name"
          [subtitle]="'Configure su suscripción al fondo ' + selectedFund()?.category"
          (close)="onCloseModals()"
        >
          <btg-subscription-form [fund]="selectedFund()!" (onSuccess)="onCloseModals()" />
        </btg-modal>
      }
      @if (fundToCancel()) {
        <btg-modal 
          [title]="'Confirmar Retiro'"
          [subtitle]="'Fondo: ' + fundToCancel()?.name"
          (close)="onCloseModals()"
        >
          <btg-cancel-confirmation 
            [fund]="fundToCancel()!" 
            (confirmCancel)="handleCancelConfirm()"
            (cancel)="onCloseModals()"
          />
        </btg-modal>
      }
    </div>
  `,
})
export class FundsPage {
  private fundService = inject(FundService);
  private notificationService = inject(NotificationService);
  public facade = inject(FinanceFacade);

  isLoading = signal(true);
  selectedFund = signal<Fund | null>(null); // Para suscripción
  fundToCancel = signal<Fund | null>(null); // Para cancelación

  funds = toSignal(this.fundService.getFunds().pipe(tap(() => this.isLoading.set(false))), {
    initialValue: [],
  });

  onOpenSubscription(fund: Fund) {
    this.selectedFund.set(fund);
  }

  onOpenCancellation(fund: Fund) {
    this.fundToCancel.set(fund);
  }

  handleCancelConfirm() {
    const fund = this.fundToCancel();
    if (fund) {
      this.facade.cancel(fund.id);
      this.onCloseModals();

      this.notificationService.notify(`Se ha cancelado la suscripción al fondo ${fund.name}. El saldo ha sido devuelto a su cuenta`, 'success');
    }
  }

  onCloseModals() {
    this.selectedFund.set(null);
    this.fundToCancel.set(null);
  }

}
