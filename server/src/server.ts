import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dbInstance from './db/instantiate-sequelize';
import { Router } from './routes';

const PORT = process.env.PORT || 6000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(Router);

const start = async () => {
    try {
        await dbInstance.authenticate();
        app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`));
    } catch (error) {
        console.log('Unable to connect to the database:', error);
        process.exit(1);
    }
};

start();