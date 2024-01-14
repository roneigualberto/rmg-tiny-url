import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { UserModel } from './user/form/user.model';
import { AuthModule } from './auth/auth.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tiny_url',
      password: 'tinyurl123!',
      database: 'tiny_url_db',
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    UrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
