import { Request, Response } from "express";
import * as taskService from "../services/task.service";

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const task = await taskService.createTask(userId, { title, description });
    return res.status(201).json(task);
  } catch (error: any) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const getUserTasks = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const tasks = await taskService.getUserTasks(userId);
    return res.status(200).json(tasks);
  } catch (error: any) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};
