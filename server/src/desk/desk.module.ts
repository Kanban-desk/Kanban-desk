import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Status } from './entities/status.entity';
import { Desk } from './entities/desk.entity';
import { DeskController } from './controllers/desk.controller';
import { DeskService } from './services/desk.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Status, Desk]), UserModule],
  controllers: [DeskController],
  providers: [DeskService],
})
export class DeskModule {}
