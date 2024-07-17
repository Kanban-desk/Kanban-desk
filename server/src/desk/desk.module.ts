import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Status } from './entities/status.entity';
import { Desk } from './entities/desk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Status, Desk])],
})
export class DeskModule {}
