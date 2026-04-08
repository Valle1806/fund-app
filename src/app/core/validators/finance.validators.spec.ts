import { FormControl } from '@angular/forms';
import { FinanceValidators } from './finance.validators';

describe('FinanceValidators', () => {
  describe('insufficientBalance', () => {
    it('debe retornar error si el valor supera el balance', () => {
      const validator = FinanceValidators.insufficientBalance(100);
      const control = new FormControl(150);
      expect(validator(control)).toEqual({ insufficient: true });
    });

    it('debe retornar null si el valor es menor o igual al balance', () => {
      const validator = FinanceValidators.insufficientBalance(100);
      const control = new FormControl(50);
      expect(validator(control)).toBeNull();
    });

    it('debe retornar null si el valor es null o undefined', () => {
      const validator = FinanceValidators.insufficientBalance(100);
      expect(validator(new FormControl(null))).toBeNull();
      expect(validator(new FormControl(undefined))).toBeNull();
    });
  });

  describe('minFundAmount', () => {
    it('debe retornar error si el valor es menor al mínimo', () => {
      const validator = FinanceValidators.minFundAmount(50000);
      const control = new FormControl(10000);
      expect(validator(control)).toEqual({ 
        minAmount: { required: 50000, actual: 10000 } 
      });
    });

    it('debe retornar null si el valor es mayor o igual al mínimo', () => {
      const validator = FinanceValidators.minFundAmount(50000);
      const control = new FormControl(60000);
      expect(validator(control)).toBeNull();
    });
  });

  describe('positiveInteger', () => {
    it('debe retornar error si no es entero', () => {
      const validator = FinanceValidators.positiveInteger();
      expect(validator(new FormControl(10.5))).toEqual({ invalidNumber: true });
    });

    it('debe retornar error si es negativo o cero', () => {
      const validator = FinanceValidators.positiveInteger();
      expect(validator(new FormControl(-10))).toEqual({ invalidNumber: true });
      expect(validator(new FormControl(0))).toEqual({ invalidNumber: true });
    });

    it('debe retornar null si es entero positivo', () => {
      const validator = FinanceValidators.positiveInteger();
      expect(validator(new FormControl(100))).toBeNull();
    });
  });
});
