import {Router, Request, Response} from 'express';
import { UserModel } from '../models/UserModel';
import { UserController } from '../controllers/UserController';

export class UserRouter {
    public static create(router: Router) {
        const model = new UserModel();
        const controller = new UserController(model);
        router.post('/user', async (req: Request, res: Response) => {
            await controller.createUser(req, res);
        });
        router.get('/user/:id', async (req: Request, res: Response) => {
            await controller.getUserById(req, res);
        });
        router.get('/user', async (req: Request, res: Response) => { 
            await controller.getAllUsers(req, res);
        });
        router.delete('/user/:id', async (req: Request, res: Response) => {
            await controller.deleteUser(req, res);
        } );
    }
};