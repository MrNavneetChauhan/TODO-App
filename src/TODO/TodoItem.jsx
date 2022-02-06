import { useState } from "react";
import "../CSS/TodoField.css";
export const TodoItem = ({ task_name, status,id ,deleteAnItem }) => {
  const [checkState, setChekcState] = useState(false);

  return (
    <div className="TodoField">
      <input
        className="radioBtn"
        onClick={() => setChekcState(!checkState)}
        checked={checkState}
        type="checkbox"
      />

      <div className={checkState ? "underline" : "no-underline"} type="text">
        {task_name}
      </div>

      <button onClick={()=>deleteAnItem(id)} className="del">Delete</button>
    </div>
  );
};
