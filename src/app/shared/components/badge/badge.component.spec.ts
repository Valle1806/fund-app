import { render, screen } from '@testing-library/angular';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  it('debe renderizar el label correctamente', async () => {
    await render(BadgeComponent, {
      inputs: {
        label: 'Test Label',
        variant: 'success'
      }
    });

    expect(screen.getByText('Test Label')).toBeTruthy();
  });

  it('debe aplicar la clase de variante correcta', async () => {
    await render(BadgeComponent, {
      inputs: {
        label: 'Success Badge',
        variant: 'success'
      }
    });

    const badgeElement = screen.getByText('Success Badge');
    expect(badgeElement.classList.contains('btg-badge-success')).toBeTrue();
  });

  it('debe usar la variante neutral por defecto', async () => {
    await render(BadgeComponent, {
      inputs: {
        label: 'Neutral Badge'
      }
    });

    const badgeElement = screen.getByText('Neutral Badge');
    expect(badgeElement.classList.contains('btg-badge-neutral')).toBeTrue();
  });
});
