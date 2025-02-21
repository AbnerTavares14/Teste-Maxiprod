import {Router, Request, Response} from 'express';
import { ConsultationModel } from '../models/ConsultModel';
import { ConsultationController } from '../controllers/ConsultationController';

export class ConsultationRouter {
    public static create(router: Router) {
        const model = new ConsultationModel();
        const controller = new ConsultationController(model);

         /**
         * @swagger
         * /consultation/{id}:
         *   get:
         *     summary: Consulta um usuário para ver todas as suas despesas, receitas e saldo líquido
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: ID da pessoa a ser buscada
         *     responses:
         *       200:
         *         description: Detalhes da pessoa retornados com sucesso
         *       404:
         *         description: Pessoa não encontrada
         */
        router.get('/consultation/:id', async (req: Request, res: Response) => {
            await controller.consult(req, res);
        });

        /**
        * @swagger
        * /consultation:
        *   get:
        *     summary: Retorna uma lista com os detalhes gerais de todas as pessoas e com o total geral de receitas, despesas e saldo líquido
        *     responses:   
        *       200:
        *         description: Retorno uma lista com os detalhes gerais de todas as pessoas e com o total geral de receitas, despesas e saldo líquido
        */
        router.get('/consultation', async (req: Request, res: Response) => {
            await controller.consults(req, res);
        });

    }
}