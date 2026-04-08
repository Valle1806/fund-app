import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
/**
 * Componente para mostrar un estado vacío (“empty state”) en cualquier pantalla.
 * 
 * Solo le pasas un `title`, `description` y opcionalmente un `icon`, 
 * y se encarga de mostrar todo centrado y con estilo consistente.
 */
@Component({
  selector: 'btg-empty-state',
  standalone: true,
  imports:[LucideAngularModule],
  template:  `
    <div class="flex flex-col items-center justify-center py-16 px-6 text-center">
      <lucide-icon [name]="icon()" class="w-3 h-3 mb-4"></lucide-icon>
      <h3 class="text-lg font-semibold mb-2" style="color: var(--btg-text)">{{ title() }}</h3>
      <p class="text-sm max-w-xs" style="color: var(--btg-text-muted)">{{ description() }}</p>
    </div>
  `,
})
export class EmptyStateComponent {
  icon = input<string>('mailbox');
  title = input.required<string>();
  description = input.required<string>();
}
