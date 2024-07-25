import React, { useEffect, useState } from "react";
import { getTodos } from "./services/todoService";
import TodoForm from "./component/TodoForm";
import TodoList from "./component/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await getTodos();
      setTodos(res.data);
    };
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm
        todo={todo}
        setTodo={setTodo}
        todos={todos}
        setTodos={setTodos}
        isEdit={isEdit}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        setTodo={setTodo}
        setIsEdit={setIsEdit}
      />
    </div>
  );
};

export default App;
