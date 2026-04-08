/**
 * Tipos de transacción posibles en el sistema.
 */
export type TransactionType = 'SUBSCRIPTION' | 'CANCELLATION';

/**
 * Métodos de notificación disponibles al suscribirse a un fondo.
 */
export type NotificationMethod = 'EMAIL' | 'SMS';

/**
 * Representa una transacción registrada en el historial del usuario.
 */
export interface Transaction {
  id: string;
  fundId: number;
  fundName: string;
  type: TransactionType;
  amount: number;
  notificationMethod?: NotificationMethod;
  createdAt: Date;
}