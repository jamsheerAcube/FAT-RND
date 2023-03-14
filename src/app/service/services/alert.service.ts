import { Injectable } from "@angular/core";
import { NotificationService } from "@progress/kendo-angular-notification";

@Injectable({ providedIn: 'root' })
export class AlertService {
    constructor(private notificationService: NotificationService) {
    }

    showSuccess(message: string) {
        this.notificationService.show({
            content: message,
            type: { icon: true, style: 'success' },
            animation: { type: "fade", duration: 800 },
            position: { horizontal: 'center', vertical: 'top' }
        });
    }

    showError(message: string) {
        debugger;
        this.notificationService.show({
            content: message,
            type: { icon: true, style: 'error' },
            animation: { type: "fade", duration: 800 },
            position: { horizontal: 'center', vertical: 'top' }
        });
    }
}