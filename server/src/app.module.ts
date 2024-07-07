import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { envConfigSchema } from './configuration';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({validationSchema: envConfigSchema}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'client'),
    }),
    UserModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
