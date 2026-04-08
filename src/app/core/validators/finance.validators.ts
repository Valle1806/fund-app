import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/**
 * Conjunto de validadores personalizados para el dominio financiero.
 *
 * Centraliza reglas de negocio relacionadas con montos de inversión,
 * como validación de saldo disponible, monto mínimo requerido por fondo
 * y formato de valores numéricos válidos.
 *
 * Todos los validadores están diseñados como funciones puras (`ValidatorFn`),
 * permitiendo su reutilización, fácil testeo y desacoplamiento del estado
 * global (por ejemplo, recibiendo valores como parámetros en lugar de
 * depender directamente del Store).
 */
export class FinanceValidators {
  /**
   * Valida que el monto solicitado no supere el balance disponible en el Store.
   * Se pasa el balance como parámetro para mantener la función pura y testeable.
   */
  static insufficientBalance(availableBalance: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined) return null;
      
      return value > availableBalance ? { insufficient: true } : null;
    };
  }

  /**
   * Valida que el monto cumpla con el requisito de apertura del fondo.
   */
  static minFundAmount(minRequired: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined) return null;

      return value < minRequired ? { minAmount: { required: minRequired, actual: value } } : null;
    };
  }

  /**
   * Valida que el valor sea un número entero positivo.
   */
  static positiveInteger(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      
      const isInteger = Number.isInteger(value);
      const isPositive = value > 0;
      
      return (!isInteger || !isPositive) ? { invalidNumber: true } : null;
    };
  }
}