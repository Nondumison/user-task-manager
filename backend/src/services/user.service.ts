import { AppDataSource } from "../config/database";
import { User } from "../models/User";

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create(userData);
  return await userRepository.save(user);
};

export const getAllUsers = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.find();
};

export const getUserById = async (id: number): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.findOneBy({ id });
};

export const deleteUser = async (id: number): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const result = await userRepository.delete(id);
  if (result.affected === 0) {
    throw new Error("User not found");
  }
};