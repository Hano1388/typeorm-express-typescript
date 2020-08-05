import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';

import { User } from '../entity/User';
import Auth from '../utils/auth';

export = {
    createUser: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { first_name, last_name, email, password } = req.body;
        const foundUser = await getManager().createQueryBuilder(User, 'user')
            .where("user.email = :email", { email: email })
            .getOne();

        if (!foundUser) {
            try {
                let userParams;
                const hash = await Auth.hashPassword(password).catch(err => console.error(err));
                userParams = { first_name, last_name, email, password: hash };

                const userRepo = getManager().getRepository(User);
                const newUser = userRepo.create(userParams);
                const user = await userRepo.save(newUser).catch(err => console.error(err));
                return res.json({ id: user['id'] });
            } catch (err) {
                next(err[0]);
            }
        } else {

            res.statusCode = 400;
            next(new Error('Email in use'));
        }
    }
}