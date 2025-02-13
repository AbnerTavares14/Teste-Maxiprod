import {Request, Response} from 'express';
import {IConsultController} from '../interfaces/IConsultController';
import {IConsultationModel} from '../interfaces/IConsultModel';

export class ConsultationController implements IConsultController {
    private model: IConsultationModel;

    constructor(model: IConsultationModel) {
        this.model = model;
    }

    async consult(req: Request, res: Response): Promise<Response | void> {
        const {id} = req.params;
        const consult = await this.model.getConsultById(Number(id));
        res.send(consult);
    }

    async consults(req: Request, res: Response): Promise<Response | void> {
        const consults = await this.model.getConsult();
        res.send(consults);
    }
}