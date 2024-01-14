import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './form/user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [UserService],
})
export class UserModule {}
