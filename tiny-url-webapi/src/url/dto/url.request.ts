import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class UrlRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl({
    require_tld: false,
  })
  longUrl: string;

  @ApiProperty()
  description: string;
}
