import { Pipe, PipeTransform } from '@angular/core';
/**
 * Pipe reutilizable para formatear valores en pesos colombianos (COP).
 *
 * Uso: {{ amount | copCurrency }}
 * Ejemplo: 500000 → "COP $500.000"
 *
 * Pure pipe: Angular solo lo recalcula cuando el valor
 */
@Pipe({
  name: 'copCurrency',
  standalone: true,
  pure: true
})
export class CopCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  }

}
