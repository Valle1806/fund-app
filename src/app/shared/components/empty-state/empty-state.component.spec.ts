import { render, screen } from '@testing-library/angular';
import { LucideAngularModule, Mailbox } from 'lucide-angular';
import { EmptyStateComponent } from './empty-state.component';

describe('EmptyStateComponent', () => {
  it('debe renderizar el título y descripción correctamente', async () => {
    await render(EmptyStateComponent, {
      imports: [LucideAngularModule.pick({ Mailbox })],
      inputs: {
        title: 'No hay datos',
        description: 'No se encontraron resultados para tu búsqueda',
        icon: 'mailbox'
      }
    });

    expect(screen.getByText('No hay datos')).toBeTruthy();
    expect(screen.getByText('No se encontraron resultados para tu búsqueda')).toBeTruthy();
  });

  it('debe usar el icono por defecto si no se proporciona uno', async () => {
    const { container } = await render(EmptyStateComponent, {
      imports: [LucideAngularModule.pick({ Mailbox })],
      inputs: {
        title: 'Título',
        description: 'Descripción'
      }
    });

    const iconElement = container.querySelector('lucide-icon');
    expect(iconElement).toBeTruthy();
  });
});
