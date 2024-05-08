import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';

import { ResponseInterceptor } from './interceptors/response-global.interceptor';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors();
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.use(json({ limit: '5mb' }));

  const { PORT } = process.env;

  await app.listen(PORT || 3001);
  console.info(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});