import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { User } from '../entity/User';
import Auth from '../utils/auth';

export = {
    createSession: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const user = req.body;
            const foundUser = await getManager().createQueryBuilder(User, 'user')
                .where("user.email = :email", { email: user.email }).getOne();
            if (foundUser) {
                const passwordMatch = await Auth.compare(user.password, foundUser.password);
                if (passwordMatch) {
                    const isSecure = req.app.get('env') !== 'development';
                    res.cookie('user_id', foundUser.id, {
                        expires: new Date(Date.now() + 700000),
                        httpOnly: true,
                        secure: isSecure,
                        signed: true
                    });

                    return res.json({
                        message: 'Successfully Signed In!'
                    });
                } else {
                    throw new Error('Incorrect Password');
                }
            } else {
                throw new Error('Incorrect Email')
            }
        } catch (err) {
            res.statusCode = 400;
            next(err);
        }
    }
}