import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CopCurrencyPipe } from './core/pipes/cop-currency/cop-currency-pipe';
import { FinanceFacade } from './core/facades/finance-facade/finance-facade';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    CopCurrencyPipe,
    LucideAngularModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private facade = inject(FinanceFacade);
  readonly balance = toSignal(this.facade.balance$, { initialValue: 0 });

  readonly navItems = [
    { route: '/funds', label: 'Fondos', icon: 'trending-up' },
    { route: '/portfolio', label: 'Portafolio', icon: 'wallet' },
    { route: '/transactions', label: 'Historial', icon: 'clock' },
  ];
}
