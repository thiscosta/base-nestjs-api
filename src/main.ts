import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { globalExceptions } from './filters/global.exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  globalExceptions.forEach((exception) => app.useGlobalFilters(exception));
  await app.listen(3000);
}
bootstrap();
