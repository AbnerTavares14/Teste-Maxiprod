import {Router, Request, Response} from 'express';
import { PersonModel } from '../models/PersonModel';
import { PersonController } from '../controllers/PersonController';

export class PersonRouter {
    public static create(router: Router) {
        const model = new PersonModel();
        const controller = new PersonController(model);
        router.post('/user', async (req: Request, res: Response) => {
            await controller.create(req, res);
        });
        router.get('/user/:id', async (req: Request, res: Response) => {
            await controller.getPersonById(req, res);
        });
        router.get('/user', async (req: Request, res: Response) => { 
            await controller.getPeople(req, res);
        });
        router.delete('/user/:id', async (req: Request, res: Response) => {
            await controller.deletePerson(req, res);
        } );
    }
};