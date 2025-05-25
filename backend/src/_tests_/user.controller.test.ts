import { Request, Response } from 'express';
import * as userController from '../controllers/user.controller';
import * as userService from '../services/user.service';

jest.mock('../services/user.service');

describe('User Controller', () => {
  let req: Partial<Request>, res: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('createUser', () => {
    it('creates user successfully', async () => {
      (userService.createUser as jest.Mock).mockResolvedValue({ id: 1 });
      req = { body: { name: 'John', email: 'test@test.com' } };

      await userController.createUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(userService.createUser).toHaveBeenCalledWith(req.body);
    });

    it('rejects missing fields', async () => {
      req = { body: { email: 'test@test.com' } };
      await userController.createUser(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('getUsers', () => {
    it('returns user list', async () => {
      (userService.getAllUsers as jest.Mock).mockResolvedValue([{ id: 1 }]);
      await userController.getUsers(req as Request, res as Response);
      expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
    });
  });

  describe('deleteUser', () => {
    it('deletes successfully', async () => {
      req = { params: { id: '1' } };
      await userController.deleteUser(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it('handles not found', async () => {
      (userService.deleteUser as jest.Mock)
        .mockRejectedValue(new Error('User not found'));
      req = { params: { id: '1' } };
      await userController.deleteUser(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});