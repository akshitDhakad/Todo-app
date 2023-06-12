import { useEffect, useState } from 'react';
import './App.css';
import { TaskForm } from './TaskForm';
import { Task } from './Task';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTasks = (currTask) => {
    setTasks((prevTask) => {
      return [...prevTask, { currTask: currTask, done: false }];
    });
  };

  useEffect(() => {
    if (!tasks) return;
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
  return (
    <main>
      <div className="form-container">
        <TaskForm addTasks={addTasks} />
        <div className="task-container">
          {tasks.map((task, index) => {
            return (
              <Task
                {...task}
                key={index}
                onToggle={(newDone) => {
                  updateDone(index, newDone);
                }}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
