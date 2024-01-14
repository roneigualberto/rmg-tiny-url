import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LoggedUser } from './logged-user';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : (user as LoggedUser);
  },
);
