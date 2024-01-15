import { Inject, Injectable } from '@nestjs/common';

import * as crypto from 'crypto';

export class ShortUrlGenerator {
  public static generate(longUrl: string): string {
    const uuid = crypto.randomUUID();
    const data = `${uuid}:${longUrl}}`;
    const hash = crypto.createHash('sha1').update(data).digest('hex');
    return hash.substring(0, 7);
  }
}
