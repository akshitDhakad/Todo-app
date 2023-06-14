import { useState } from 'react';
import Checkbox from './Checkbox';
export const Task = ({ currTask, done, onToggle, onTrash, onRename }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className={`task ${done ? 'done' : ''}`}>
      <div className="remove-task">
        <Checkbox
          checked={done}
          onClick={() => {
            onToggle(!done);
          }}
        />
        {!editMode && (
          <div
            className="task-name"
            onClick={() => {
              setEditMode((task) => !task);
            }}
          >
            {currTask}
          </div>
        )}
        {editMode && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEditMode(false);
            }}
          >
            <input
              type="text"
              value={currTask}
              onChange={(e) => {
                onRename(e.target.value);
              }}
            ></input>
          </form>
        )}
      </div>

      <button className="svg-button" onClick={onTrash}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
        </svg>
      </button>
    </div>
  );
};
