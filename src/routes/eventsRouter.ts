import express from 'express';

import EventsController from '../controllers/events';
import { validateEvent } from '../middlewares/validations/validateEvent';
const router = express.Router();

export = router.post('/', validateEvent, EventsController.createEvent)
    .get('/', EventsController.getAllEvents)
    .get('/:id', EventsController.getOneEvent);