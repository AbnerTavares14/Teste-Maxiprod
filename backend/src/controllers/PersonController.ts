import {Request, Response} from 'express';
import { IPersonController } from '../interfaces/IPersonController';
import { IPersonModel } from '../interfaces/IPersonModel';

export class PersonController implements IPersonController {
    private readonly personModel: IPersonModel;

    constructor(personModel: IPersonModel) {
        this.personModel = personModel;
    }

    
    async create(req: Request, res: Response): Promise<Response | void> {
        const person = await this.personModel.create(req.body);
        res.send(person).status(201);
    }

    async getPersonById(req: Request, res: Response): Promise<Response | void> {
        const user = await this.personModel.getPersonById(Number(req.params.id));
        res.send(user);
    }

    async getPeople(req: Request, res: Response): Promise<Response | void> {
        const users = await this.personModel.getPeople();
        res.send(users);
    }

    async deletePerson(req: Request, res: Response): Promise<Response | void> {
        await this.personModel.deletePersonById(Number(req.params.id));
        res.sendStatus(200);
    }
}