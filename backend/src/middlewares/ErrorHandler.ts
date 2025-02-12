import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';

export class ErrorHandler {
  public getMiddleware() {
    return (err: Error | AppError, req: Request, res: Response, next: NextFunction): void => {
      if (err instanceof AppError) {
        this.sendErrorResponse(res, err.statusCode, err.message, err.details);
        return;
      }
      console.error('Erro inesperado:', err);
      this.sendErrorResponse(res, 500, 'Erro interno do servidor');
    };
  }

  private sendErrorResponse(res: Response, statusCode: number, message: string, details?: any): void {
    res.status(statusCode).json({
      success: false,
      message,
      ...(details && { details }),
    });
  }
}

export const errorHandler = new ErrorHandler();