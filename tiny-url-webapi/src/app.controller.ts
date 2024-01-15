import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { UrlService } from './url/url.service';

import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Response } from 'express';
import { Public } from './auth/guard/public.decorator';

@Controller({
  path: '',
  version: '',
})
export class AppController {
  constructor(
    private readonly urlService: UrlService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/u/:shortUrl')
  @Public()
  async redirectUrl(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ): Promise<void> {
    const cacheKey = `url_${shortUrl}`;

    let longUrl: string = await this.cacheManager.get(cacheKey);

    if (!longUrl) {
      const url = await this.urlService.findByShortUrl(shortUrl);
      if (!url) {
        throw new NotFoundException();
      }
      longUrl = url.longUrl;
      await this.cacheManager.set(cacheKey, longUrl, 30000);
    }

    res.redirect(longUrl);
  }
}
