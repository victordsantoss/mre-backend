import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = this.getStatus(exception);
    const errorMessage = this.getMessage(exception);

    if (exception instanceof HttpException) {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      });
      return;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorMessage,
      messageDetail: this.getExceptionMessage(exception),
    });
  }

  private getExceptionMessage(exception: unknown): string {
    if (
      exception &&
      typeof exception === 'object' &&
      'message' in exception &&
      typeof exception.message === 'string'
    ) {
      return exception.message;
    }
    return 'Unknown error';
  }

  private getStatus(exception: unknown) {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getMessage(exception: unknown) {
    return exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error';
  }
}
