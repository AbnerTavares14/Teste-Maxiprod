import {Router, Request, Response} from 'express';
import { ConsultationModel } from '../models/ConsultModel';
import { ConsultationController } from '../controllers/ConsultationController';

export class ConsultationRouter {
    public static create(router: Router) {
        const model = new ConsultationModel();
        const controller = new ConsultationController(model);
        router.get('/consultation/:id', async (req: Request, res: Response) => {
            await controller.consult(req, res);
        });
        router.get('/consultation', async (req: Request, res: Response) => {
            await controller.consults(req, res);
        });

    }
}