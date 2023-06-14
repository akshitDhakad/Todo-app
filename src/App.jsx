import { useEffect, useState } from 'react';
import './App.css';
import { TaskForm } from './Components/TaskForm';
import { Task } from './Components/Task';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTasks = (currTask) => {
    setTasks((prevTask) => {
      return [...prevTask, { currTask: currTask, done: false }];
    });
  };

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const intialTask = JSON.parse(localStorage.getItem('tasks'));
    setTasks(intialTask);
  }, []);

  const updateDone = (index, done) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].done = done;
      return newTasks;
    });
  };

  const numberCompleted = tasks ? tasks.filter((t) => t.done).length : 0;
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

  return (
    <div className="main-container">
      <main>
        <h1>ToDo App</h1>
        <h2> Status : {`${numberCompleted} / ${totalTasks}`} </h2>
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
            className={`${tasks.length === 0 ? 'hide' : 'clear-all'}`}
            onClick={removeAllTasks}
          >
            <svg
              className="remove-button"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
