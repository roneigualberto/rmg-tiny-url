import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from 'src/user/user.service';
import { UrlForm } from './form/create.url.form';
import { ShortUrlGenerator } from './short-url.generator';
import { UrlModel } from './url.model';

@Injectable()
export class UrlService {
  constructor(
    private readonly userService: UserService,
    @InjectModel(UrlModel) private urlModel: typeof UrlModel,
  ) {}

  public async create(username: string, form: UrlForm): Promise<UrlModel> {
    const owner = await this.userService.findByUsername(username);

    const { longUrl } = form;

    const shortUrl = ShortUrlGenerator.generate(longUrl);

    const url = await this.urlModel.create({
      ownerId: owner.id,
      owner,
      longUrl,
      shortUrl,
      description: form.description,
    });

    return url;
  }

  async update(
    username: string,
    id: string,
    urlForm: UrlForm,
  ): Promise<UrlModel> {
    const owner = await this.userService.findByUsername(username);

    const url = await this.get(id);

    if (url.ownerId !== owner.id) {
      throw new UnauthorizedException();
    }

    url.set({
      longUrl: urlForm.longUrl,
      description: urlForm.description,
    });

    await url.save();

    return url;
  }

  async findByShortUrl(shortUrl: string): Promise<UrlModel> {
    const url = await this.urlModel.findOne({
      where: {
        shortUrl,
      },
    });

    return url;
  }

  async findByOwner(username: string) {
    const owner = await this.userService.findByUsername(username);

    return await this.urlModel.findAll({
      where: {
        ownerId: owner.id,
      },
    });
  }

  async get(id: string): Promise<UrlModel> {
    const url = await this.urlModel.findOne({
      where: {
        id,
      },
    });

    if (!url) {
      throw new NotFoundException();
    }

    return url;
  }

  async delete(id: string): Promise<void> {
    const url = await this.get(id);
    url.destroy();
  }
}
