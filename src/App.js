import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";

// importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  // Statestuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("All");
  const [filteredTodos, setfilteredTodos] = useState([]);

  //RUN ONCE when the app starts
  useEffect(() => {
    getLocalTodos();
  }, []);
  // UsEEffect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  // Functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setfilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setfilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setfilteredTodos(todos);
        break;
    }
  };
  // Save to Local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}

export default App;

// Functions
// filterHandler = () => {
//   switch (status) {
//     case "completed":
//       setfilterTodos(todos.filter((todo) => todo.completed === true));
//       break;
//     case "uncompleted":
//       setfilterTodos(todos.filter((todo) => todo.completed === false));
//       break;
//     default:
//       setfilterTodos(todos);
//       break;
//   }
// };
