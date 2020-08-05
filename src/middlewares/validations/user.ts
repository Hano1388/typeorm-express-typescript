import { Request, Response, NextFunction } from 'express';
import { validateOrReject } from 'class-validator';
import { getManager } from 'typeorm';
import { User } from '../../entity/User';
import { generateErrorMessages } from '../../utils/errorMessages/index';

export const
    validateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRepo = getManager().getRepository(User);
            const newUser = userRepo.create(req.body);

            await validateOrReject(newUser, { skipMissingProperties: true, validationError: { target: false } });
            next();
        } catch (err) {
            res.statusCode = 400;
            // We can generate a list of returned errors from validations
            const errorList = generateErrorMessages(err);
            /*
                [
                    "firstName should not be null or undefined",
                    "email must be an email",
                    "password should not be null or undefined"
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
