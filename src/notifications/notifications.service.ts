import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { Repository } from 'typeorm';
import { Notifications } from './notifications.entity';


@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notifications)
        private notificationRepository: Repository<Notifications>,

        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ) { }

    async addNewNotification(userId: number, notification: object) {
        let userNotification = await this.notificationRepository.findOne({ where: { user: { id: userId } } });

        if (!userNotification) {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new NotFoundException('User not found');
            }

            userNotification = this.notificationRepository.create({
                user,
                notifications: { new: [], old: [] },
            });
        }

        userNotification.notifications.new.push(notification);

        return this.notificationRepository.save(userNotification);
    }

    async moveToOldNotifications(userId: number, notificationIndex: number) {
        const userNotification = await this.notificationRepository.findOne({ where: { user: { id: userId } } });

        if (!userNotification) {
            throw new NotFoundException('Notifications for this user not found');
        }

        const { new: newNotifications, old: oldNotifications } = userNotification.notifications;

        if (notificationIndex < 0 || notificationIndex >= newNotifications.length) {
            throw new NotFoundException('Notification not found in new notifications');
        }

        const notificationToMove = newNotifications.splice(notificationIndex, 1)[0];
        oldNotifications.push(notificationToMove);

        return this.notificationRepository.save(userNotification);
    }

    async deleteOldNotification(userId: number, notificationIndex: number) {
        const userNotification = await this.notificationRepository.findOne({ where: { user: { id: userId } } });

        if (!userNotification) {
            throw new NotFoundException('Notifications for this user not found');
        }

        const { old: oldNotifications } = userNotification.notifications;

        if (notificationIndex < 0 || notificationIndex >= oldNotifications.length) {
            throw new NotFoundException('Notification not found in old notifications');
        }

        oldNotifications.splice(notificationIndex, 1);

        return this.notificationRepository.save(userNotification);
    }
}
