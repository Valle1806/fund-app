import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { LucideAngularModule, TrendingUp, Wallet, Clock, Mailbox, TriangleAlert, ArrowUpRight, ArrowDownLeft, Mail, MessageSquare } from 'lucide-angular';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({ TrendingUp, Wallet, Clock, Mailbox, TriangleAlert, ArrowUpRight, ArrowDownLeft, Mail, MessageSquare }))
  ]
};
