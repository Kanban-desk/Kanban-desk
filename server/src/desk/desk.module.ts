import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Status } from './entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Status])],
})
export class DeskModule {}
