import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import * as taskController from '../controllers/task.controller';

const router = Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

router.get('/users/:id/tasks', taskController.getUserTasks);
router.post('/users/:id/tasks', taskController.createTask);


export default router;