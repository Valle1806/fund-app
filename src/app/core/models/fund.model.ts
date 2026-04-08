/**
 * Categorías disponibles para los fondos BTG Pactual.
 * FPV: Fondo de Pensión Voluntaria
 * FIC: Fondo de Inversión Colectiva
 */
export type FundCategory = 'FPV' | 'FIC';
 
/**
 * Representa un fondo de inversión disponible en el sistema.
 */
export interface Fund {
  id: number;
  name: string;
  minimumAmount: number;
  category: FundCategory;
}
 
/**
 * Representa la suscripción activa de un usuario a un fondo.
 */
export interface ActiveFund {
  fund: Fund;
  subscribedAmount: number;
  subscribedAt: Date;
}
 