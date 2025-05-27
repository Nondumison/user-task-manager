import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Task } from "../models/Task";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "/app/database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Task],
  subscribers: [],
  migrations: ["src/migrations/*.ts"],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};
