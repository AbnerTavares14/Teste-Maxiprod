import express, {Express, json, Router} from 'express';
import 'express-async-errors';
import cors from 'cors';
import { seed } from './config/db';
import {UserRouter} from './routes/UserRouter';
import { errorHandler } from './middlewares/ErrorHandler';

class App {
    public express: Express = express();

    constructor() {
        this.middlewares();
        this.routes();
        this.errorMiddleware();
    }

    async createSeed() {
        await seed();
    }

    private middlewares() {
        this.express.use(cors());
        this.express.use(json());
    }

    private errorMiddleware() {
        this.express.use(errorHandler.getMiddleware());
    }

    private routes() {
        const router = Router();
        router.get('/', (req, res) => {
            res.send('Works well');
        });
        UserRouter.create(router);
        this.express.use('/', router);
    }


}

export default new App();