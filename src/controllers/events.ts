import { validateOrReject } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { Event } from '../entity/Event';
import { User } from '../entity/User';

export = {
    createEvent: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const eventRepo = getManager().getRepository(Event);
            const user = await getManager().createQueryBuilder(User, 'user')
                .where("user.id = :id", { id: req.signedCookies['user_id'] }).getOne();
            const newEvent = eventRepo.create(req.body);
            newEvent['user'] = user
            await eventRepo.save(newEvent);
            return res.json(newEvent);
        } catch (err) {
            next(err);
        }
    }
}