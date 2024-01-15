import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UserModule } from 'src/user/user.module';
import { UrlController } from './url.controller';
import { UrlModel } from './url.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [UserModule, SequelizeModule.forFeature([UrlModel])],
  providers: [UrlService],
  exports: [UrlService],
  controllers: [UrlController],
})
export class UrlModule {}
