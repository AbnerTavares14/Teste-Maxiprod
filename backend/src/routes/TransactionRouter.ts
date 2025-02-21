import {Router, Request, Response} from 'express';
import { TransactionModel } from '../models/TransactionModel';
import { TransactionController } from '../controllers/TransactionController';
import {validateSchema} from '../middlewares/validateSchema';
import {transactionSchema} from '../schemas/TransactionSchema';

export class TransactionRouter {
    public static create(router: Router) {
        const model = new TransactionModel();
        const controller = new TransactionController(model);
        /**
         * @swagger
         * /transaction:
         *   post:
         *     summary: Cria uma nova transação
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Transaction'
         *     responses:
         *       201:
         *         description: Transação criada com sucesso
         *       400:
         *         description: Requisição inválida
         *       404:
         *         description: Pessoa não encontrada
         */
        router.post('/transaction', validateSchema.getMiddleware(transactionSchema), async (req: Request, res: Response) => {
            await controller.create(req, res);
        });

        /**
         * @swagger
         * /transaction/{id}:
         *   get:
         *     summary: Obtém os detalhes de uma transação pelo ID
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: ID da transação a ser buscada
         *     responses:
         *       200:
         *         description: Detalhes da transação retornados com sucesso
         *       404:
         *         description: Transação não encontrada
         */
        router.get('/transaction/:id', async (req: Request, res: Response) => {
            await controller.getTransactionById(req, res);
        });

        /**
         * @swagger
         * /transaction:
         *   get:
         *     summary: Obtém todas as transações
         *     responses:
         *       200:
         *         description: Lista de transações retornada com sucesso
         *       500:
         *         description: Erro interno no servidor
         */
        router.get('/transaction', async (req: Request, res: Response) => { 
            await controller.getAllTransactions(req, res);
        });
    }
};