import { Component, input } from '@angular/core';
/**
 * Spinner de carga reutilizable.
 * */
@Component({
  selector: 'btg-loading-spinner',
  standalone: true,
   template: `
    <div class="flex flex-col items-center justify-center py-12 gap-3">
      <div class="btg-spinner"></div>
      @if (message()) {
        <p class="text-sm" style="color: var(--btg-text-muted)">{{ message() }}</p>
      }
    </div>
  `,
})
export class LoadingSpinnerComponent {
  message = input<string>('Cargando...');

}
