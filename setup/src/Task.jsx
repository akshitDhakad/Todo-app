import { useState } from 'react';
import Checkbox from './Checkbox';
export const Task = ({ currTask, done, onToggle }) => {
  return (
    <div className="task">
      <Checkbox
        checked={done}
        onClick={() => {
          onToggle(!done);
        }}
      />
      {currTask}
    </div>
  );
};
