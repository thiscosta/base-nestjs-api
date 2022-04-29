import { PrismaExceptionsFilter } from 'src/filters/exceptions/prisma-exceptions.filter';
import { NotFoundExceptionFilter } from 'src/filters/exceptions/not-found-exception.filter';

export const globalExceptions = [
  new NotFoundExceptionFilter(),
  new PrismaExceptionsFilter(),
];
