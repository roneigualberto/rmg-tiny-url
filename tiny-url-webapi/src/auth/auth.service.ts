import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserForm } from 'src/user/form/create-user-form';
import { UserModel } from 'src/user/form/user.model';
import { UserService } from 'src/user/user.service';
import { PasswordEncoder } from './password-encoder';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private passworEncoder: PasswordEncoder,
  ) {}

  async signIn(username: any, password: any) {
    const user = await this.userService.findByUsername(username);

    await this.checkUser(user, password);

    return await this.generateToken(user);
  }

  async signUp(form: CreateUserForm) {
    form.password = await this.passworEncoder.hashPassword(form.password);
    await this.userService.create(form);
  }

  private async checkUser(user: UserModel, password: string) {
    if (!user) {
      throw new UnauthorizedException();
    }

    const match = await this.passworEncoder.match(password, user.password);

    if (!match) {
      throw new UnauthorizedException();
    }
  }

  private async generateToken(user: UserModel) {
    const payload = {
      sub: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
