import {Router, Request, Response} from 'express';
import { TransactionModel } from '../models/TransactionModel';
import { TransactionController } from '../controllers/TransactionController';

export class TransactionRouter {
    public static create(router: Router) {
        const model = new TransactionModel();
        const controller = new TransactionController(model);
        router.post('/transaction', async (req: Request, res: Response) => {
            await controller.create(req, res);
        });
        router.get('/transaction/:id', async (req: Request, res: Response) => {
            await controller.getTransactionById(req, res);
        });
        router.get('/transaction', async (req: Request, res: Response) => { 
            await controller.getAllTransactions(req, res);
        });
    }
};