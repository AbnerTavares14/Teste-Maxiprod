import { Request, Response } from 'express';

export interface IUserController {
    createUser(req: Request, res: Response): Promise<Response | void>;
    getUserById(req: Request, res: Response): Promise<Response | void>;
    getAllUsers(req: Request, res: Response): Promise<Response | void>;
    deleteUser(req: Request, res: Response): Promise<Response | void>;
};