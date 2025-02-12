import {Request, Response} from 'express';
import { IUserController } from '../interfaces/IUserController';
import { IUserModel } from '../interfaces/IUserModel';

export class UserController implements IUserController {
    private readonly userModel: IUserModel;

    constructor(userModel: IUserModel) {
        this.userModel = userModel;
    }
    
    async createUser(req: Request, res: Response): Promise<Response | void> {
        await this.userModel.create(req.body);
        res.sendStatus(201);
    }

    async getUserById(req: Request, res: Response): Promise<Response | void> {
        const user = await this.userModel.getUserById(Number(req.params.id));
        res.send(user);
    }

    async getAllUsers(req: Request, res: Response): Promise<Response | void> {
        const users = await this.userModel.getAllUsers();
        res.send(users);
    }

    async deleteUser(req: Request, res: Response): Promise<Response | void> {
        await this.userModel.deleteUser(Number(req.params.id));
        res.sendStatus(200);
    }
}