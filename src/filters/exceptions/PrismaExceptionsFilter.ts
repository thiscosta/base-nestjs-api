import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

type ErrorType = {
  status: number;
  message: string;
  error: string;
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionsFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusByErrorCode: Record<string, ErrorType> = {
      P2002: {
        status: 409,
        message: `Unique constraint violation: ${exception.meta['target']}`,
        error: 'Conflict',
      },
      default: { status: 500, message: 'Unexpected error', error: 'Error' },
    };

    const { status, message, error } = statusByErrorCode[exception.code];

    response.status(status).json({
      statusCode: status,
      message: [message],
      error: error,
    });
  }
}
