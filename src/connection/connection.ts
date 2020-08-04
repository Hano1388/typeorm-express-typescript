import { createConnection } from "typeorm";
import { User } from "../entity/User";
import { Event } from '../entity/Event';

export const connection = createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432, // default port of postgres
    // username: "hano", // Your db client username
    // password: "supersecret", // Your db client password
    database: "typeorm_express_typescript", // our created database name, you can have your own
    entities: [
        // typeORM will not be able to create database table if we forget to put entity class name here..
        User, // our User entity class
        Event,
    ],
    synchronize: true,
    logging: false
});