// src/App.js
import { useEffect, useState } from "react";
import "./App.css";
import { TaskForm } from "./Components/TaskForm";
import { Task } from "./Components/Task";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
} from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks.");
        setLoading(false);
      }
    };
    getTasks();
  }, []);

  // Add a new task
  const addTasks = async (currTask) => {
    try {
      const newTask = await createTask({ currTask, done: false });
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task.");
    }
  };

  // Update task completion status
  const updateDone = async (id, done) => {
    try {
      const updatedTask = await updateTask(id, { done });
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task.");
    }
  };

  // Rename a task
  const renameTask = async (id, currTask) => {
    try {
      const updatedTask = await updateTask(id, { currTask });
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (err) {
      console.error("Error renaming task:", err);
      setError("Failed to rename task.");
    }
  };

  // Remove a single task
  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task.");
    }
  };

  // Remove all tasks
  const removeAllTasksHandler = async () => {
    try {
      await deleteAllTasks();
      setTasks([]);
    } catch (err) {
      console.error("Error deleting all tasks:", err);
      setError("Failed to delete all tasks.");
    }
  };

  // Calculate completed tasks
  const numberCompleted = tasks.filter((t) => t.done).length;
  const totalTasks = tasks.length;

  // Time and Date
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const todaysDate = `${day}/${month}/${year}`;
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedHours = hours % 12 || 12;
  const period = hours >= 12 ? "PM" : "AM";
  const currentTime = `${formattedHours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${period}`;

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <nav className="w-full bg-[#508C9B]">
        <h1 className="lg:text-2xl">Task Management App</h1>
        <div className="flex items-center gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div className="text-xs lg:text-sm">
            <p>Date : {todaysDate} </p>
            <p>Time : {currentTime} </p>
          </div>
        </div>
      </nav>
      <main>
        <div className="bg-white lg:w-[60%] m-auto py-2 px-4">
          <h2 className="mb-2 lg:text-xl font-semibold text-red-500">
            <span>Completed Tasks :</span> {`${numberCompleted}`} /{" "}
            {`${totalTasks}`}
          </h2>
          {error && <div className="error">{error}</div>}
          <div className="form-container">
            <TaskForm addTasks={addTasks} />
            <div className="task-container">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  {...task}
                  onRename={(newName) => renameTask(task._id, newName)}
                  onTrash={() => removeTask(task._id)}
                  onToggle={(newDone) => updateDone(task._id, newDone)}
                />
              ))}
            </div>
            {tasks.length > 0 && (
              <button
                className="py-2 bg-black flex justify-center items-center gap-x-4 clear-all"
                onClick={removeAllTasksHandler}
              >
                <span className="text-xl text-white">Clear All</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
