import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';

import { User } from '../entity/User';
import Auth from '../utils/auth';

export = {
    createUser: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { first_name, last_name, email, password } = req.body;
            const foundUser = await getManager().createQueryBuilder(User, 'user')
                .where("user.email = :email", { email: email })
                .getOne();

            if (!foundUser) {
                let userParams;
                const hash = await Auth.hashPassword(password)
                userParams = { first_name, last_name, email, password: hash };
                const userRepo = getManager().getRepository(User);
                const newUser = userRepo.create(userParams);
                console.log('newUser: ', newUser);
                const user = await userRepo.save(newUser);
                // Create a cookie and sign in automatically after signing up
                res.cookie('user_id', user['id'], {
                    expires: new Date(Date.now() + 700000),
                    httpOnly: true,
                    secure: req.app.get('env') !== 'development',
                    signed: true
                });

                return res.json({ id: user['id'] });
            } else {

                res.statusCode = 400;
                next(new Error('Email in use'));
            }

        } catch (err) {
            res.statusCode = 400;
            next(err)
        }
    }
}