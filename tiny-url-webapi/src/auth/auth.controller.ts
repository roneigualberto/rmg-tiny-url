import {
  Body,
  Request,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthCredentialRequest } from './dto/auth-credential.request';
import { AuthService } from './auth.service';
import { UserAccountRequest } from './dto/user-account.request';
import { CreateUserForm } from 'src/user/form/create-user-form';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guard/jwt-auth-guard';
import { Public } from './guard/public.decorator';
import { LoggedUser } from './logged-user/logged-user';
import { User } from './logged-user/user.decorator';
import { userInfo } from 'os';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() credential: AuthCredentialRequest) {
    return this.authService.signIn(credential.email, credential.password);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() account: UserAccountRequest) {
    const userForm: CreateUserForm = {
      username: account.username,
      name: account.name,
      email: account.email,
      password: account.password,
    };
    return this.authService.signUp(userForm);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: LoggedUser) {
    return user;
  }
}
