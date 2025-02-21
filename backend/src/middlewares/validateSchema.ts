import {Request, Response, NextFunction} from 'express';


class ValidateSchema {
    public getMiddleware(schema: any) {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                schema.parse(req.body);
                next();
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: (error as any).errors[0].message,
                    errors: (error as any).errors
                });
            }
        }
    }
}

export const validateSchema = new ValidateSchema();