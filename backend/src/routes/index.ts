import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import * as taskController from '../controllers/task.controller';

const router = Router();

router.get('/health', (_req, res) => {
    res.status(200).send('Healthy');
  });

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

router.get('/users/:id/tasks', taskController.getUserTasks);
router.post('/users/:id/tasks', taskController.createTask);

router.delete('/users/:id', userController.deleteUser);
router.delete('/tasks/:id', taskController.deleteTask);


export default router;