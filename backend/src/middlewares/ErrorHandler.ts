import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';

export class ErrorHandler {
  public getMiddleware() {
    return (err: Error | AppError, req: Request, res: Response, next: NextFunction): void => {
      if (err instanceof AppError) {
        this.sendErrorResponse(res, err.statusCode, err.message, err.details);
        return;
      }

      if (err.name === 'ZodError') {
        this.handleZodError(err, res);
        return;
      }

      console.error('Erro inesperado:', err);
      this.sendErrorResponse(res, 500, 'Erro interno do servidor');
    };
  }

  private handleZodError(err: any, res: Response): void {
    const errors = err.errors.map((error: any) => ({
      path: error.path.join('.'),
      message: error.message,
    }));
    
    this.sendErrorResponse(res, 400, 'Erro de validação', { errors });
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