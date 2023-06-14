import { useState } from 'react';

export const TaskForm = ({ addTasks }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) {
      alert('Task cannot be empty');
      return;
    }

    addTasks(taskName);
    setTaskName('');
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="Add New Task"
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
        ></input>
        <button>Add</button>
      </form>
    </>
  );
};
