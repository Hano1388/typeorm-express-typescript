import "reflect-metadata";
import express, { Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from "cookie-parser";
import methodOverride from 'method-override';

import { connection } from './connection/connection';
import usersRouter from './routes/usersRouter';

connection.then(async connection => {
    // Configure the server here
    const app = express();
    app.use(logger('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser());

    app.use(
        methodOverride((req: Request, res: Response) => {
            if (req.body && req.body._method) {
                const method = req.body._method;
                return method;
            }
        })
    );

    // Use routes below
    // await Bootstrap().catch(err => console.error(err));

    app.use('/api/v1/users', usersRouter);


    app.listen(3000);
    console.log('Express Application is running on port 3000');

}).catch((error) => console.log("TypeORM Connection Error: ", error));
