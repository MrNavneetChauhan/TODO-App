import { useEffect, useState } from "react";
import "../CSS/TodoField.css";
import {BsPlusLg} from "react-icons/bs"


export const TodoField = ({ passText }) => {
  const [checkState, setChekcState] = useState(false);

  
  const [text, setText] = useState("");

  function showInput(e) {
    setText(e.target.value);
  }



  return (
    <div className="TodoField">
      <input
        className="radioBtn diffBtn"
        onClick={() => setChekcState(!checkState)}
        checked={checkState}
        type="checkbox"
      />

      <input
        className={checkState ? "underline" : "no-underline"}
        type="text"
        onChange={(e) => showInput(e)}
      />

      <button  onClick={() => passText(text)} className="addBtn">
          <BsPlusLg/>
      </button>
      <button className="del del2">Delete</button>
    </div>
  );
};
