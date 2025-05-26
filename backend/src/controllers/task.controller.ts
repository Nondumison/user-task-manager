import { Request, Response } from "express";
import * as taskService from "../services/task.service";

// export const createTask = async (req: Request, res: Response) => {
//   try {
//     const userId = parseInt(req.params.id);
//     const { title, description } = req.body;

//     if (!title) {
//       res.status(400).json({ error: "Title is required" });
//       return;
//     }

//     const task = await taskService.createTask(userId, { title, description });
//     res.status(201).json(task);
//   } catch (error: any) {
//     if (error.message === "User not found") {
//       res.status(404).json({ error: error.message });
//       return;
//     }
//     res.status(500).json({ error: "Failed to create task" });
//   }
// };

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { title, description, status } = req.body; 

    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const task = await taskService.createTask(userId, {
      title,
      description,
      status, 
    });
    res.status(201).json(task);
  } catch (error: any) {
    if (error.message === "User not found") {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const getUserTasks = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const tasks = await taskService.getUserTasks(userId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id);
    await taskService.deleteTask(taskId);
    res.status(204).send();
  } catch (error: any) {
    if (error.message === "Task not found") {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Failed to delete task" });
  }
};