import React, { useState, useEffect } from "react";
import { getUserTasks, createTask, deleteTask } from "../services/api";
import { Task } from "../types";

interface TaskListProps {
  userId: number;
  onBack: () => void;
  onTaskModified?: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ userId, onBack }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getUserTasks(userId);
        console.log("Fetched tasks:", response);
        setTasks(response);
      } catch (error) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  // const handleAddTask = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!newTaskTitle) {
  //     setError("Title is required");
  //     return;
  //   }

  //   try {
  //     const task = await createTask(userId, {
  //       title: newTaskTitle,
  //       description: newTaskDescription,
  //     });
  //     setTasks([...tasks, task]);
  //     setNewTaskTitle("");
  //     setNewTaskDescription("");
  //     setIsCreating(false);
  //   } catch (error) {
  //     setError("Failed to add task");
  //   }
  // };
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) {
      setError("Title is required");
      return;
    }
  
    try {
      const task = await createTask(userId, {
        title: newTaskTitle,
        description: newTaskDescription,
        status: "todo",
      });
      setTasks((prev) => [...prev, task]);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setIsCreating(false);
    } catch (error) {
      setError("Failed to add task");
    }
  };
  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      setError("Failed to delete task");
    }
  };

  // const toggleTaskStatus = (taskId: number) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === taskId
  //         ? {
  //             ...task,
  //             status:
  //               task.status === "todo"
  //                 ? "in-progress"
  //                 : task.status === "in-progress"
  //                 ? "done"
  //                 : "todo",
  //           }
  //         : task
  //     )
  //   );
  // };
  const toggleTaskStatus = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) return task;
  
        const nextStatus =
          task.status === "todo"
            ? "in-progress"
            : task.status === "in-progress"
            ? "done"
            : "todo";
  
        return {
          ...task,
          status: nextStatus,
          completed: nextStatus === "done",
        };
      })
    );
  };

  if (loading) return <div className="text-center">Loading tasks...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="task-board">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button onClick={onBack} className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left"></i> Back to Team
        </button>
        <h3>Task Board</h3>
        <button className="btn btn-primary" onClick={() => setIsCreating(true)}>
          <i className="bi bi-plus"></i> Add Task
        </button>
      </div>

      {isCreating && (
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleAddTask}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Task title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  rows={3}
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Create Task
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-4">
          <div className="column-header bg-info text-white p-2 rounded-top">
            <h5>To Do</h5>
          </div>
          <div className="column-content">
            {tasks
              .filter((task) => task.status === "todo")
              .map((task) => (
                <div key={task.id} className="task-card card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5>{task.title}</h5>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    <p>{task.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className={`status-badge ${
                          task.completed ? "status-completed" : "status-pending"
                        }`}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => toggleTaskStatus(task.id)}
                      >
                        {task.completed ? "Mark Pending" : "Mark Complete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="col-md-4">
          <div className="column-header bg-warning text-white p-2 rounded-top">
            <h5>In Progress</h5>
          </div>
          <div className="column-content">
            {tasks
              .filter((task) => task.status === "in-progress")
              .map((task) => (
                <div key={task.id} className="task-card card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5>{task.title}</h5>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    <p>{task.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="status-badge status-in-progress">
                        In Progress
                      </span>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => toggleTaskStatus(task.id)}
                      >
                        Move Forward
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="col-md-4">
          <div className="column-header bg-success text-white p-2 rounded-top">
            <h5>Done</h5>
          </div>
          <div className="column-content">
            {tasks
              .filter((task) => task.status === "done")
              .map((task) => (
                <div key={task.id} className="task-card card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5>{task.title}</h5>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    <p>{task.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className={`status-badge ${
                          task.completed ? "status-completed" : "status-pending"
                        }`}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => toggleTaskStatus(task.id)}
                      >
                        {task.completed ? "Mark Pending" : "Mark Complete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
