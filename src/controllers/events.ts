import { validateOrReject } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { Event } from '../entity/Event';
import { User } from '../entity/User';

export = {
    // POST: /events
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
    },

    getAllEvents: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            // const eventsRepo = getManager().getRepository(Event);
            const events = await getManager().query(`SELECT * FROM events`);
            return res.json(events);
        } catch (err) {
            next(err);
        }
    }
}