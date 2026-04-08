import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NotificationService,
  NotificationType,
} from '../../../core/services/notification-message/notification-message';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'btg-notification',
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="btg-toast-container">
      @if (notifications$ | async; as notifications) {
        @for (notification of notifications; track notification.id) {
          <div class="btg-toast" [ngClass]="notification.type">
            <div class="btg-toast-icon" [ngClass]="getIconClass(notification.type)">
              <lucide-icon [name]="getIconName(notification.type)" class="w-4 h-4"></lucide-icon>
            </div>

            <p class="btg-toast-message">{{ notification.message }}</p>

            <button class="btg-toast-close" (click)="dismiss(notification.id)">
              <lucide-icon name="x" class="w-4 h-4"></lucide-icon>
            </button>
          </div>
        }
      }
    </div>
  `,
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);

  public notifications$ = this.notificationService.notifications$;

  public getIconClass(type: NotificationType): string {
    return `icon-${type}`;
  }

  public getIconName(type: NotificationType): string {
    const icons: Record<NotificationType, string> = {
      success: 'circle-check',
      error: 'circle-alert',
      info: 'info',
    };
    return icons[type];
  }

  public dismiss(id: string): void {
    this.notificationService.dismiss(id);
  }
}
