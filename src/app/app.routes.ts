import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'funds',
    pathMatch: 'full',
  },
  {
    path: 'funds',
    loadComponent: () =>
      import('./features/funds/funds.page').then((m) => m.FundsPage),
    title: 'Fondos disponibles — BTG Fondos',
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./features/transactions/transactions.page').then((m) => m.TransactionsPage),
    title: 'Historial — BTG Fondos',
  },
  {
    path: '**',
    redirectTo: 'funds',
  },];
