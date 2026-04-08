import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CopCurrencyPipe } from './core/pipes/cop-currency/cop-currency-pipe';
import { FinanceFacade } from './core/facades/finance-facade/finance-facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { NotificationComponent } from './shared/components/notification/notification.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    CopCurrencyPipe,
    LucideAngularModule,
    NotificationComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private facade = inject(FinanceFacade);
  readonly balance = toSignal(this.facade.balance$, { initialValue: 0 });

  readonly navItems = [
    { route: '/funds', label: 'Fondos', icon: 'trending-up' },
    { route: '/transactions', label: 'Historial', icon: 'clock' },
  ];

  public onReset(): void {
    const confirmReset = confirm('Estás seguro de que quieres restablecer todos los datos? Esto borrará tu saldo y transacciones.');
    
    if (confirmReset) {
      this.facade.resetAccount();
    }
  }
}
