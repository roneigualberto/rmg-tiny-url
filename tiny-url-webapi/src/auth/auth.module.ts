import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { PasswordEncoder } from './password-encoder';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/jwt-auth-guard';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordEncoder,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
