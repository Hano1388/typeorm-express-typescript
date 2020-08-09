import { validate } from 'class-validator';
import express from 'express';

import UsersController from '../controllers/users';
import { validateUser } from '../middlewares/validations/validateUser';


const router = express.Router();

router.post('/', validateUser, UsersController.createUser);

export = router;