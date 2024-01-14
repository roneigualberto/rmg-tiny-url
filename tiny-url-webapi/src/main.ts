import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as compression from 'compression';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: 'v1',
    prefix: 'api/',
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle('Tiny URL API')
    .setDescription('Tiny URL API documention')
    .setVersion('v1')
    .addTag('auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
