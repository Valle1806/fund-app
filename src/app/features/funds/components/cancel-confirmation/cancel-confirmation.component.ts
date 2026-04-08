import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fund } from '../../../../core/models/fund.model';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { LucideAngularModule } from 'lucide-angular';
/**
 * Componente de confirmación de cancelación de inversión.
 * 
 * Muestra una alerta advirtiendo al usuario que está a punto de retirar
 * su inversión en un fondo específico. Permite:
 *  - Confirmar la cancelación (emitirá un evento `confirmCancel`)
 *  - Mantener la inversión (emitirá un evento `cancel`)
 * 
 * También gestiona un estado de procesamiento (`isProcessing`) para mostrar
 * un spinner mientras se simula la operación de retiro.
 */
@Component({
  selector: 'btg-cancel-confirmation',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent,LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      @if (isProcessing()) {
        <div class="py-8">
          <btg-loading-spinner message="Procesando el retiro de fondos..." />
        </div>
      } @else {
        <div class="btg-alert btg-alert-warning">
          <lucide-icon name="triangle-alert" class="w-5 h-5 mt-0.5"></lucide-icon>
          <p class="text-xs leading-relaxed">
            Estás a punto de retirar tu inversión en <strong>{{ fund().name }}</strong
            >. El dinero será devuelto a tu balance disponible inmediatamente.
          </p>
        </div>
        <div class="flex flex-col gap-3">
          <button (click)="confirm()" class="btg-btn btg-btn-primary btg-btn-full h-12">
            Confirmar Cancelación
          </button>

          <button (click)="cancel.emit()" class="btg-btn btg-btn-ghost btg-btn-full h-12">
            Mantener Inversión
          </button>
        </div>
      }
    </div>
  `,
})
export class CancelConfirmationComponent {
  fund = input.required<Fund>();
  confirmCancel = output<void>();
  cancel = output<void>();

  isProcessing = signal(false);

  async confirm() {
    try {
      this.isProcessing.set(true);

      // Feedback visual para que el usuario sienta que la transacción se procesa
      await new Promise((res) => setTimeout(res, 1200));

      this.confirmCancel.emit();
    } finally {
      this.isProcessing.set(false);
    }
  }
}
