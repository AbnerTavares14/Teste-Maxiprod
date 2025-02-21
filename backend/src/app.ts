import express, {Express, json, Router} from 'express';
import 'express-async-errors';
import cors from 'cors';
import { seed } from './config/db';
import {PersonRouter} from './routes/PersonRouter';
import {TransactionRouter} from './routes/TransactionRouter';
import {ConsultationRouter} from './routes/ConsultationRouter';
import { errorHandler } from './middlewares/ErrorHandler';
import {swaggerDocs} from "./swaggerOptions";
import swaggerUi from "swagger-ui-express";

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
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    }

    private errorMiddleware() {
        this.express.use(errorHandler.getMiddleware());
    }

    private routes() {
        const router = Router();
        router.get('/', (req, res) => {
            res.send('Works well');
        });
        PersonRouter.create(router);
        TransactionRouter.create(router);
        ConsultationRouter.create(router);
        this.express.use('/', router);
    }


}

export default new App();