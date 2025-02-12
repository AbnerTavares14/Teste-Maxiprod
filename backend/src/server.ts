import dotenv from 'dotenv';

dotenv.config();

import app from './app';

Promise.resolve(app.createSeed()).then(() => {console.log('Database is ready!')});

const port = process.env.PORT || 5000;


app.express.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});