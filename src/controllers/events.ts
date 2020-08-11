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

    // GET: /events
    getAllEvents: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const events = await getManager().query(`SELECT * FROM events`);
            return res.json(events);
        } catch (err) {
            next(err);
        }
    },

    // GET: events/:id
    getOneEvent: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            // const event = await getManager().createQueryBuilder(Event, 'event')
            //     .where("event.id = :id", { id: req.params.id }).getOne();
            const eventRepo = getManager().getRepository(Event);
            const event = await eventRepo.findOne(req.params.id);
            return res.json(event);
        } catch (err) {
            next(err);
        }
    },

    // PATCH: events/:id
    updateEvent: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const eventRepo = getManager().getRepository(Event);
            const updatedEvent = eventRepo.create(req.body);
            await eventRepo.save(updatedEvent);
            return res.json(updatedEvent);
        } catch (err) {
            next(err);
        }
    }

}

// Note: To get a single event using query string GET /events?id=uuid, we can use
//  one endpoint for both getOne and getAll events by checking on query string params
//  like the following
/*
    const event(s) =
                req.query.id ?
                    await getManager().createQueryBuilder(Event, 'event')
                        .where("event.id = :id", { id: req.query.id }).getOne() :
                    await getManager().query(`SELECT * FROM events`);
*/