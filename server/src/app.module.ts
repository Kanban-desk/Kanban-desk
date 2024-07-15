import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { envConfigSchema } from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({validationSchema: envConfigSchema})
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
