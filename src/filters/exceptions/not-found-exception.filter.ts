import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { NotFoundException } from 'src/exceptions/not-found-exception';
import { NOT_FOUND } from 'http-status';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(NOT_FOUND).json({
      statusCode: NOT_FOUND,
      message: [exception.message],
      error: 'Not found',
    });
  }
}
