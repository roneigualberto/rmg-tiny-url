import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UrlRequest } from './dto/url.request';
import { UrlForm } from './form/create.url.form';
import { UrlService } from './url.service';
import { User } from 'src/auth/logged-user/user.decorator';

@Controller('url')
@ApiTags('url')
@ApiBearerAuth()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() req: UrlRequest, @User('username') username: string) {
    const urlForm: UrlForm = {
      longUrl: req.longUrl,
      description: req.description,
    };
    return this.urlService.create(username, urlForm);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id') id: string,
    @Body() req: UrlRequest,
    @User('username') username: string,
  ) {
    const urlForm: UrlForm = {
      longUrl: req.longUrl,
      description: req.description,
    };
    return this.urlService.update(username, id, urlForm);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@User('username') username: string) {
    return this.urlService.findByOwner(username);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: string) {
    return await this.urlService.get(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.urlService.delete(id);
  }
}
