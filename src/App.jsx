import { useEffect, useState } from "react";
import "./App.css";
import { TaskForm } from "./Components/TaskForm";
import { Task } from "./Components/Task";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTasks = (currTask) => {
    setTasks((prev) => {
      return [...prev, { currTask: currTask, done: false }];
    });
  };

  useEffect(() => {
    console.log(tasks);
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const intialTask = JSON.parse(localStorage.getItem("tasks"));
    setTasks(intialTask || []);
  }, []);

  const updateDone = (index, done) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].done = done;
      return newTasks;
    });
  };

  const numberCompleted = tasks.filter((t) => t.done).length;
  const totalTasks = tasks.length;

  const removeTask = (taskIndex) => {
    const newArr = [...tasks];
    newArr.splice(taskIndex, 1);
    setTasks(newArr);
  };

  const removeAllTasks = () => {
    setTasks([]);
  };

  const renameTask = (index, newName) => {
    setTasks((prev) => {
      const editedTask = [...prev];
      editedTask[index].currTask = newName;
      return editedTask;
    });
  };

  // Tiem and Date
  const currentDate = new Date();

  // Get the current date
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  // Format the date as a string
  const todaysDate = `${day}/${month}/${year}`;

  // Get the current time
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Format hours for 12-hour clock
  const formattedHours = hours % 12 || 12;

  // Determine AM or PM using ternary operator
  const period = hours >= 12 ? "PM" : "AM";

  // Format the time string
  const currentTime = `${formattedHours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${period}`;

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
        <div className=" bg-white lg:w-[60%] m-auto py-2 px-4">
          <h2 className="mb-2 lg:text-xl font-semibold text-red-500">
            {" "}
            <span className="">
              Completed Task :
            </span> {`${numberCompleted}`} / {`${totalTasks}`}
          </h2>
          <div className="form-container">
            <TaskForm addTasks={addTasks} />
            <div className="task-container">
              {tasks.map((task, index) => {
                return (
                  <Task
                    {...task}
                    key={index}
                    onRename={(newName) => {
                      renameTask(index, newName);
                    }}
                    onTrash={() => {
                      removeTask(index);
                    }}
                    onToggle={(newDone) => {
                      updateDone(index, newDone);
                    }}
                  />
                );
              })}
            </div>
            <button
              className={`py-2 bg-black flex justify-center items-center gap-x-4 ${
                tasks?.length === 0 ? "hide" : "clear-all"
              }`}
              onClick={removeAllTasks}
            >
              <span className="text-xl">Clear All</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
