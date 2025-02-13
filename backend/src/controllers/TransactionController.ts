import {Request, Response} from 'express';
import { ITransactionController } from '../interfaces/ITransactionController';
import { ITransactionModel } from '../interfaces/ITransactionModel';

export class TransactionController implements ITransactionController {
    private transactionModel: ITransactionModel;

    constructor (transactionModel: ITransactionModel) {
        this.transactionModel = transactionModel;
    }
    async create(req: Request, res: Response): Promise<Response | void> {
        await this.transactionModel.create(req.body);
        res.sendStatus(201);
    }
    async getTransactionById(req: Request, res: Response): Promise<Response | void> {
        const {id} = req.params;
        const transaction = await this.transactionModel.getTransactionById(Number(id));
        res.send(transaction);
    }
    async getAllTransactions(req: Request, res: Response): Promise<Response | void> {
        const transactions = await this.transactionModel.getAllTransactions();
        res.send(transactions);
    }

}