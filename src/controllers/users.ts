import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { User } from '../entity/User';



export = {
    createUser: async (req: Request, res: Response) => {
        const userRepo = getManager().getRepository(User);
        const newUser = userRepo.create(req.body);

        console.log('req.body: ', req.body);
        console.log('NEW USER: ', newUser);

        await userRepo.save(newUser).catch(err => console.error(err));

        res.json(newUser);
    }
}