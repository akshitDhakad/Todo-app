import { useState } from 'react';
import Checkbox from './Checkbox';
export const Task = ({ currTask, done, onToggle, onTrash, onRename }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className={`task ${done ? "done bg-red-400" : "bg-green-400"}`}>
      <div className="remove-task  flex items-center hover:cursor-pointer">
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
              required
              onChange={(e) => {
                onRename(e.target.value);
              }}
            ></input>
          </form>
        )}
      </div>

      <button
        className="svg-button bg-white hover:bg-black border shadow-sm"
        onClick={onTrash}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-red-500 hover:text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};
