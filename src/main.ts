import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { PrismaExceptionsFilter } from 'src/filters/exceptions/prisma-exceptions.filter';
import { NotFoundExceptionFilter } from './filters/exceptions/not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
