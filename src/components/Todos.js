import React, { useState, useEffect } from "react";
import "../App.css";
const url = "https://assets.breatheco.de/apis/fake/todos/user/johndoe";
const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [init, setInit] = useState(true);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    const fetchGetTodos = () => {
      return fetch(url)
        .then(res => res.json())
        .then(res => {
          return res;
        })
        .catch(err => console.log("error:" + err));
    };
    const fetchCreateUser = () => {
      return fetch(url, {
        method: "POST",
        body: JSON.stringify([]),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(res => {
          return res;
        })
        .catch(err => console.log("error:" + err));
    };
    const fetchUpdateToDos = () => {
      const todosData = todos.map(todo => {
        return { label: todo, done: false };
      });
      return fetch(url, {
        method: "PUT",
        body: JSON.stringify(todosData),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(res => {
          return res;
        })
        .catch(err => console.log("error:" + err));
    };
    //  Making GET request, testing is user exits
    if (init === true) {
      fetchGetTodos().then(res => {
        console.log("response: " + JSON.stringify(res));
        // if user does not exist, we get a "msg"
        if (res.msg) {
          // If user does not exists, we'll create it
          console.log("user does not exists");
          fetchCreateUser().then(() => {
            fetchGetTodos(url).then(res =>
              setTodos(res.map(todo => todo.label))
            );
            setInit(false);
          });
        } else {
          setTodos(res.map(todo => todo.label));
          setInit(false);
        }
      });
    } else {
      fetchUpdateToDos();
    }
  }, [todos, init]);

  console.log(todos);
  const deleteTodo = indexToDelete => {
    setTodos(prevTodos => {
      return prevTodos.filter((value, index) => {
        return indexToDelete !== index;
      });
    });
  };
  return (
    <div className="Todo">
      <h1 className="Font">
        <b>My Todo List</b>
      </h1>
      <div className=" Todo2 input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new todo"
          aria-label="Enter new todo"
          aria-describedby="button-addon2"
          name={inputValue}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-secondary"
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
      <ul className="list-group">
        {todos.map((value, index) => {
          return (
            <li
              className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center"
              key={index}
            >
              {value}
              <span
                type="button"
                onClick={() => {
                  deleteTodo(index);
                }}
              >
                X
              </span>
            </li>
          );
        })}
        <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
          {todos.length} items left
        </li>
      </ul>
    </div>
  );
};
export default Todos;
