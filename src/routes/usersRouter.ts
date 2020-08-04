import express from 'express';

import UsersController from '../controllers/users';

const router = express.Router();

router.post('/', UsersController.createUser);

export = router;