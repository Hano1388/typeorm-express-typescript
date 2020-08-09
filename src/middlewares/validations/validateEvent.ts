import { Request, Response, NextFunction } from 'express';
import { validateOrReject } from 'class-validator';
import { getManager } from 'typeorm';
import { Event } from '../../entity/Event';
import { generateErrorMessages } from '../../utils/errorMessages/index';

export const
    validateEvent = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const eventRepo = getManager().getRepository(Event);
            const newEvent = eventRepo.create(req.body);
            await validateOrReject(newEvent, { skipMissingProperties: true });
            next();

        } catch (err) {
            res.statusCode = 400;
            // We can generate a list of returned errors from validations
            const errorList = generateErrorMessages(err);
            /*
                [
                    "first_name must be longer than or equal to 3 characters",
                    "last_name must be longer than or equal to 3 characters",
                    "email must be an email",
                    "password must be longer than or equal to 5 characters"
                ]
            */
            next({ message: errorList });

            // or we can send the entire error object
            /*
            [
                {
                    "property": "firstName",
                    "children": [],
                    "constraints": { "isDefined": "firstName should not be null or undefined" }
                },
                ...
            ]
            */

            // next({ message: err });

        }
    }
