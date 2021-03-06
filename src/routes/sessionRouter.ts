import express from 'express';
import SessionController from '../controllers/session';
import { validateUser } from '../middlewares/validations/validateUser';

const router = express.Router();

router.post('/', validateUser, SessionController.createSession)
    .delete('/', SessionController.destroySession);

export = router;