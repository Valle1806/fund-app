import { ActiveFund } from "./fund.model";
import { Transaction } from "./transaction.model";
 
/**
 * Representa el usuario único del sistema BTG.
 * No requiere autenticación — se asume un solo usuario con saldo inicial.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  activeFunds: ActiveFund[];
  transactionHistory: Transaction[];
}