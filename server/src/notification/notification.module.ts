import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Notification } from './entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Notification])],
})
export class NotificationModule {}