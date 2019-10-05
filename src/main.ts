import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.NODE_ENV || 3333;
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  await app.listen(port);

  logger.log(`Application listening on port: ${port}`);
}
bootstrap();
