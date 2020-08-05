import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from "cookie-parser";
import methodOverride from 'method-override';

import { connection } from './connection/connection';
// import { Error } from './types';
import usersRouter from './routes/usersRouter';

connection.then(async connection => {
    // Configure the server here
    const app = express();
    app.use(logger('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
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


    app.use((req: Request, res: Response, next: NextFunction) => {
        const err: Error = new Error('Not Found')
        res.statusCode = 404;
        next(err);
    });

    // error handler 
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(res.statusCode || 500)
            .json({
                // error: req.app.get('env') === 'development' ? err : {},
                error: {
                    statusCode: res.statusCode || 500,
                    message: err.message || 'Internal Server Error',
                }
            })
    });
    // 
    app.listen(3000);
    console.log('Express Application is running on port 3000');

}).catch((error) => console.log("TypeORM Connection Error: ", error));
