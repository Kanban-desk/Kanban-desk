import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { envConfigSchema } from './configuration';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppDataSource } from './data-source';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({validationSchema: envConfigSchema}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'client'),
    }),
    TypeOrmModule.forRoot({...AppDataSource.options, autoLoadEntities: true}),
    UserModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
