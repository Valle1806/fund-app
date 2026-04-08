import { render, screen, fireEvent } from '@testing-library/angular';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  it('debe renderizar el título y subtítulo correctamente', async () => {
    await render(ModalComponent, {
      inputs: {
        title: 'Título Modal',
        subtitle: 'Subtítulo Modal'
      }
    });

    expect(screen.getByText('Título Modal')).toBeTruthy();
    expect(screen.getByText('Subtítulo Modal')).toBeTruthy();
  });

  it('debe emitir el evento close al hacer clic en el botón de cerrar', async () => {
    let closed = false;
    await render(ModalComponent, {
      inputs: {
        title: 'Título'
      },
      on: {
        close: () => closed = true
      }
    });

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(closed).toBeTrue();
  });
});
