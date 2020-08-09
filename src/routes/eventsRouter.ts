import express from 'express';

import EventsCountroller from '../controllers/events';
import { validateEvent } from '../middlewares/validations/validateEvent';
const router = express.Router();

export = router.post('/', validateEvent, EventsCountroller.createEvent);