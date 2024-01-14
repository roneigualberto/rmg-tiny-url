import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './form/user.model';
import { CreateUserForm } from './form/create-user-form';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  async findByUsername(username: string): Promise<UserModel | undefined> {
    return this.userModel.findOne({
      where: {
        username,
      },
    });
  }

  async create(form: CreateUserForm): Promise<UserModel> {
    const user = await this.userModel.create({
      name: form.name,
      username: form.username,
      email: form.email,
      password: form.password,
    });

    return user;
  }
}
