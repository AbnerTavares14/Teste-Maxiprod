import {Request, Response} from 'express';

export interface ITransactionController {
    create(req:Request, res:Response): Promise<Response | void>;
    getTransactionById(req:Request, res:Response): Promise<Response | void>;
    getAllTransactions(req:Request, res:Response): Promise<Response | void>;
};