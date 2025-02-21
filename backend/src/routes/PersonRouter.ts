import {Router, Request, Response} from 'express';
import { PersonModel } from '../models/PersonModel';
import { PersonController } from '../controllers/PersonController';
import { validateSchema } from '../middlewares/validateSchema';
import { personSchema } from '../schemas/PersonSchema';




export class PersonRouter {
    public static create(router: Router) {
        const model = new PersonModel();
        const controller = new PersonController(model);

        /**
         * @swagger
         * /user:
         *   post:
         *     summary: Cria uma nova pessoa no banco de dados
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Person'
         *     responses:
         *       201:
         *         description: Person created
         *       400:
         *         description: Bad request
         *       409:
         *         description: Person already registered
         */
        router.post('/user', validateSchema.getMiddleware(personSchema), async (req: Request, res: Response) => {
            await controller.create(req, res);
        });

        /**
         * @swagger
         * /user/{id}:
         *   get:
         *     summary: Obtém os detalhes de uma pessoa pelo ID
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
        router.get('/user/:id', async (req: Request, res: Response) => {
            await controller.getPersonById(req, res);
        });
        /**
        * @swagger
        * /user:
        *   get:
        *     summary: Retorna uma lista com todas as pessoas
        *     responses:   
        *       200:
        *         description: Return a list with all people
        */
        router.get('/user', async (req: Request, res: Response) => { 
            await controller.getPeople(req, res);
        });

        /**
         * @swagger
         * /user/{id}:
         *   delete:
         *     summary: Exclui uma pessoa pelo ID
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: ID da pessoa a ser excluída
         *     responses:
         *       200:
         *         description: Pessoa excluída com sucesso
         *       404:
         *         description: Pessoa não encontrada
         */
        router.delete('/user/:id', async (req: Request, res: Response) => {
            await controller.deletePerson(req, res);
        } );
    }
};