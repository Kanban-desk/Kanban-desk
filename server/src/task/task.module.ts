import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Status } from 'src/desk/entities/status.entity';
import { Priority } from './entities/priority.entity';
import Comme

@Module({
  imports: [TypeOrmModule.forFeature([User, Status, Comment, Priority])],
})
export class TaskModule {}