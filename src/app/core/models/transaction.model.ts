/**
 * Enum de transacción posibles en el sistema.
 */
export enum TransactionType {
  SUBSCRIPTION = 'SUBSCRIPTION',
  CANCELLATION = 'CANCELLATION'
}
/**
 * Métodos de notificación disponibles al suscribirse a un fondo.
 */
export enum NotificationMethod {
  EMAIL = 'EMAIL',
  SMS = 'SMS'
}
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