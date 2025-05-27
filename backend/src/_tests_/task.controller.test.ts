import { Request, Response } from 'express';
import * as taskController from '../controllers/task.controller';
import * as taskService from '../services/task.service';

jest.mock('../services/task.service');

describe('Task Controller', () => {
  let req: Partial<Request>, res: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });


  describe('createTask', () => {
    it('creates task successfully', async () => {
      (taskService.createTask as jest.Mock).mockResolvedValue({ id: 1 });
      req = { params: { id: '1' }, body: { title: 'Test' } };

      await taskController.createTask(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(taskService.createTask).toHaveBeenCalledWith(1, { title: 'Test' });
    });

    it('rejects missing title', async () => {
      req = { params: { id: '1' }, body: {} };
      await taskController.createTask(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  // describe('getUserTasks', () => {
  //   it('returns user tasks', async () => {
  //     (taskService.getUserTasks as jest.Mock).mockResolvedValue([{ id: 1 }]);
  //     req = { params: { id: '1' } };

  //     await taskController.getUserTasks(req as Request, res as Response);

  //     expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  //   });
  // });

  describe('deleteTask', () => {
    it('deletes successfully', async () => {
      req = { params: { id: '1' } };
      await taskController.deleteTask(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it('handles not found', async () => {
      (taskService.deleteTask as jest.Mock).mockRejectedValue(new Error('Task not found'));
      req = { params: { id: '1' } };
      await taskController.deleteTask(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});