import React, { useState } from "react";

const Todos = () => {
  const [todos, setTodos] = useState([1]);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="overall">
        <h1 className="words">My to-do list</h1>
        <div className=" stfu input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Todos"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            name={inputValue}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => {
                setTodos(prevTodos => [...prevTodos, inputValue]);
                setInputValue("");
              }}
            >
              Add
            </button>
          </div>
        </div>
        {todos.map((value, index) => {
          console.log(value, index);
        })}
      </div>
  );
};
export default Todos;
