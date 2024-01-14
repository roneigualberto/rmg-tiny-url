import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordEncoder {
  saltRounds = 10;

  async hashPassword(rawPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(rawPassword, salt);
  }

  async match(rawPassword: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(rawPassword, hashPassword);
  }
}
