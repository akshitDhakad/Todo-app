import { useState } from 'react';

export const TaskForm = ({ addTasks }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTasks(taskName);
    setTaskName('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <button>Add</button>
      <input
        className="form-input"
        type="text"
        placeholder="Add New Task"
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
      ></input>
    </form>
  );
};
