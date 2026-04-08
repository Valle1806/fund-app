import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinanceFacade } from '../../../../core/facades/finance-facade/finance-facade';
import { Fund } from '../../../../core/models/fund.model';
import { NotificationMethod } from '../../../../core/models/transaction.model';
import { take } from 'rxjs';
import { FinanceValidators } from '../../../../core/validators/finance.validators';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { CopCurrencyPipe } from '../../../../core/pipes/cop-currency/cop-currency-pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { NotificationService } from '../../../../core/services/notification-message/notification-message';
/**
 * Componente de suscripción a fondos (Smart Component).
 *
 * Gestiona el flujo completo de inversión de un fondo:
 * - Construye y controla un formulario reactivo para capturar el monto y método de notificación.
 * - Aplica validaciones de negocio mediante `FinanceValidators`, combinando reglas del fondo
 *   (monto mínimo) y del estado global (balance disponible).
 * - Integra el `FinanceFacade` como punto de entrada para ejecutar la acción de suscripción.
 *
 * Utiliza Angular Signals para manejar estado local (`isSending`) y para convertir el
 * `balance$` (Observable) en un signal mediante `toSignal`, manteniendo consistencia
 * con el enfoque reactivo moderno sin modificar el facade que se toma como el requisito manejar con observables.
 *
 * Emite `onSuccess` al completar correctamente la suscripción, permitiendo al componente
 * padre reaccionar (cerrar modal, refrescar datos, ...).
 */

@Component({
  selector: 'btg-subscription-form',
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent, CopCurrencyPipe],
  templateUrl: './subscription-form.component.html',
  styles: ``,
})
export class SubscriptionFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private facade = inject(FinanceFacade);
  private notificationService = inject(NotificationService);

  fund = input.required<Fund>();
  onSuccess = output<void>();

  isSending = signal(false);
  readonly balance = toSignal(this.facade.balance$, { initialValue: 0 });
  methods: NotificationMethod[] = ['EMAIL', 'SMS'] as NotificationMethod[];

  formGroup = this.formBuilder.group({
    amount: [0, [Validators.required]],
    method: ['EMAIL' as NotificationMethod, Validators.required],
  });

  get amountControl() {
    return this.formGroup.get('amount');
  }

  get methodControl() {
    return this.formGroup.get('method');
  }

  ngOnInit(): void {
    this.amountControl?.setValue(this.fund().minimumAmount);
    this.setupDynamicValidations();
  }

  /**
   * Bloquea caracteres no deseados en inputs de tipo número (e, +, -, etc).
   */
  blockInvalidKeys(event: KeyboardEvent) {
    const forbidden = ['e', 'E', '+', '-', ',', '.'];
    if (forbidden.includes(event.key)) {
      event.preventDefault();
    }
  }

  async onSubmit() {
    if (this.formGroup.invalid) {
      if (this.amountControl?.hasError('insufficientBalance')) {
        this.notificationService.notify(
          `No tiene saldo suficiente para vincularse al fondo ${this.fund().name}`,
          'error',
        );
      }
      this.formGroup.markAllAsTouched();
      return;
    }
    if (!this.isSending()) {
      this.isSending.set(true);

      // Simulación de latencia de red/notificación
      await new Promise((res) => setTimeout(res, 1500));

      const { amount, method } = this.formGroup.value;
      this.facade.subscribe(this.fund(), amount!, method!);
      this.notificationService.notify(`Se ha suscrito exitosamente al fondo ${this.fund().name}`, 'success');
      this.isSending.set(false);
      this.onSuccess.emit();
    }
  }

  /**
   * Configura los validadores de negocio cruzando datos del fondo y el balance actual.
   */
  private setupDynamicValidations() {
    this.facade.balance$.pipe(take(1)).subscribe((currentBalance) => {
      this.amountControl?.setValidators([
        Validators.required,
        FinanceValidators.positiveInteger(),
        FinanceValidators.minFundAmount(this.fund().minimumAmount),
        FinanceValidators.insufficientBalance(currentBalance),
      ]);

      // Re-evaluamos el estado del control una vez aplicados los validadores dinámicos
      this.amountControl?.updateValueAndValidity();
    });
  }
}
