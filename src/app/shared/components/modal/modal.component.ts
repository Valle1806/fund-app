import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
/**
 * Componente Modal reutilizable.
 *
 * Renderiza un overlay centrado con contenido proyectado mediante <ng-content>.
 * Permite mostrar un título obligatorio y un subtítulo opcional.
 *
 * El modal se puede cerrar:
 * - haciendo click fuera del panel (overlay)
 * - usando el botón de cierre
 *
 * Expone un output `close` para que el componente padre controle su visibilidad.
 */
@Component({
  selector: 'btg-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="btg-modal-overlay" (click)="close.emit()">
      <div
        class="btg-modal-panel shadow-2xl animate-in fade-in zoom-in duration-200"
        (click)="$event.stopPropagation()"
      >
        <header class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-white font-bold text-lg leading-tight">{{ title() }}</h3>
            @if (subtitle()) {
              <p class="text-xs text-[var(--btg-text-muted)] mt-0.5">{{ subtitle() }}</p>
            }
          </div>
          <button (click)="close.emit()" class="btg-btn-ghost p-2 rounded-full leading-none">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        <main>
          <ng-content></ng-content>
        </main>
      </div>
    </div>
  `,
})
export class ModalComponent {
  title = input.required<string>();
  subtitle = input<string>();
  close = output<void>();
}
