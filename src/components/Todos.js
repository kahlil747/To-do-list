import React, { useState } from "react";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const deleteTodos = indexToDelete => {
    setTodos(prevTodos => {
      return prevTodos.filter((value, index) => {
        return indexToDelete !== index;
      });
    });
  };
  return (
    <div className="overall">
      <h1 className="words">My to-do list</h1>
      <div className=" stfu input-group">
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
        return (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={index}
          >
            {" "}
            {value}{" "}
            <span
              type="button"
              onClick={() => {
                deleteTodos(index);
              }}
            >
              X
            </span>{" "}
          </li>
        );
      })}
      <li className="list-group-item d-flex justify-content-between align-items-center">{todos.length} items Left</li>
    </div>
  );
};
export default Todos;
