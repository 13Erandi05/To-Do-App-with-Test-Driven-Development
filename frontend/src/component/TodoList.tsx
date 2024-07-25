import React from "react";
import { deleteTodo } from "../services/todoService";

const TodoList = ({ todos, setTodos, setTodo, setIsEdit }: any) => {
  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo: any) => todo.id !== id));
  };

  return (
    <ul>
      {todos.map((todo: any) => (
        <li key={todo.id}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <button
            onClick={() => {
              setTodo(todo);
              setIsEdit(true);
            }}
          >
            Edit
          </button>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
