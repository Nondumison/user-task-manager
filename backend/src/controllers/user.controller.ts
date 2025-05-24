import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400).json({ error: "Name and email are required" });
      return;
    }
    const user = await userService.createUser({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    await userService.deleteUser(userId);
    res.status(204).send();
  } catch (error: any) {
    if (error.message === "User not found") {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Failed to delete user" });
  }
};