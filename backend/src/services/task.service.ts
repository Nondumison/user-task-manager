import { AppDataSource } from "../config/database";
import { Task } from "../models/Task";
import { User } from "../models/User";

export const createTask = async (
  userId: number,
  taskData: Partial<Task>
): Promise<Task> => {
  const taskRepository = AppDataSource.getRepository(Task);
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error("User not found");
  }

  const task = taskRepository.create({
    ...taskData,
    user,
  });

  return await taskRepository.save(task);
};

export const getUserTasks = async (userId: number): Promise<Task[]> => {
  const taskRepository = AppDataSource.getRepository(Task);
  
  return await taskRepository.find({
    where: { user: { id: userId } },
    relations: ["user"],
  });
};

export const deleteTask = async (id: number): Promise<void> => {
  const taskRepository = AppDataSource.getRepository(Task);
  const result = await taskRepository.delete(id);
  if (result.affected === 0) {
    throw new Error("Task not found");
  }
};