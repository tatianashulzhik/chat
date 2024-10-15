import { Controller, Post, Param, Body, Delete } from '@nestjs/common';
import { NotificationService } from './notifications.service';


@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post(':userId/add')
    addNewNotification(
        @Param('userId') userId: number,
        @Body() notification: object
    ) {
        return this.notificationService.addNewNotification(userId, notification);
    }

    @Post(':userId/move/:index')
    moveToOldNotifications(
        @Param('userId') userId: number,
        @Param('index') index: number
    ) {
        return this.notificationService.moveToOldNotifications(userId, index);
    }

    @Delete(':userId/delete/:index')
    deleteOldNotification(
        @Param('userId') userId: number,
        @Param('index') index: number
    ) {
        return this.notificationService.deleteOldNotification(userId, index);
    }
}
