import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationMessage {
  id: string;
  message: string;
  type: NotificationType;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _notifications$ = new BehaviorSubject<NotificationMessage[]>([]);
  public readonly notifications$ = this._notifications$.asObservable();

  
  public notify(message: string, type: NotificationType = 'info'): void {
    const id = crypto.randomUUID();
    const newNotification: NotificationMessage = { id, message, type };
    
    this._notifications$.next([...this._notifications$.value, newNotification]);

    // Ocultar despues de 5 segundos
    setTimeout(() => this.dismiss(id), 5000);
  }

  // Eliminar una notificación por ID
  public dismiss(id: string): void {
    const currentNotifications = this._notifications$.value;
    this._notifications$.next(currentNotifications.filter(n => n.id !== id));
  }
}