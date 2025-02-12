import express, {Express, json} from 'express';
import cors from 'cors';
import { seed } from './config/db';

class App {
    public express: Express = express();

    constrctor() {
        this.express.use(cors());
        this.express.use(json());
        
    }

    async createSeed() {
        await seed();
    }
}

export default new App();