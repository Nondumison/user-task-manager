import React, { useState, useEffect } from "react";
import { getUserTasks, createTask } from "../services/api";
import { Task } from "../types";

const TaskList: React.FC<{ userId: number }> = ({ userId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getUserTasks(userId);
        setTasks(response);
      } catch (error) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleAddTask = async () => {
    if (!newTaskTitle) {
      setError("Title is required");
      return;
    }

    try {
      const task = await createTask(userId, {
        title: newTaskTitle,
        description: newTaskDescription,
      });
      setTasks([...tasks, task]);
      setNewTaskTitle("");
      setNewTaskDescription("");
    } catch (error) {
      setError("Failed add task");
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mt-4">
      <h3>Tasks</h3>
      <ul className="list-group mb-4">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <h5>{task.title}</h5>
            <p>{task.description}</p>
            <small className={task.completed ? "text-success" : "text-warning"}>
              {task.completed ? "Completed" : "Pending"}
            </small>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddTask}>
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">
            Task Title
          </label>
          <input
            type="text"
            className="form-control"
            id="taskTitle"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="taskDescription"
            rows={3}
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskList;
