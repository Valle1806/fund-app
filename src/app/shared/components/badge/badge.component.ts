import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
/**
 * Componente de badge/etiqueta que muestra un texto con estilo según la variante.
 * 
 * Le pasas un `label` y opcionalmente un `variant` (‘fpv’, ‘fic’, ‘success’, ‘danger’, ‘neutral’)
 * y automáticamente le aplica la clase correcta para que se vea consistente en toda la app.
 */
export type BadgeVariant = 'fpv' | 'fic' | 'success' | 'danger' | 'neutral';

@Component({
  selector: 'btg-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="btg-badge" [ngClass]="variantClasses[variant()]">
      {{ label() }}
    </span>
  `,
})
export class BadgeComponent {
  label = input.required<string>();
  variant = input<BadgeVariant>('neutral');

  readonly variantClasses: Record<BadgeVariant, string> = {
    fpv:     'btg-badge-fpv',
    fic:     'btg-badge-fic',
    success: 'btg-badge-success',
    danger:  'btg-badge-danger',
    neutral: 'btg-badge-neutral',
  };
}
