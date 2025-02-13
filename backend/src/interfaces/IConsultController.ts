import {Request, Response} from 'express';

export interface IConsultController {
    consult(req: Request, res: Response): Promise<Response | void>;
    consults(req: Request, res: Response): Promise<Response | void>;
}