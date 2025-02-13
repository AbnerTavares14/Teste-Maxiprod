import { Request, Response } from 'express';

export interface IPersonController {
    create(req: Request, res: Response): Promise<Response | void>;
    getPersonById(req: Request, res: Response): Promise<Response | void>;
    getPeople(req: Request, res: Response): Promise<Response | void>;
    deletePerson(req: Request, res: Response): Promise<Response | void>;
};