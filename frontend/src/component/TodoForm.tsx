import React, { useState } from "react";
import { createTodo, updateTodo } from "../services/todoService";

const TodoForm = ({ todo, setTodo, todos, setTodos, isEdit }: any) => {
  const [title, setTitle] = useState(todo.title || "");
  const [description, setDescription] = useState(todo.description || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = { title, description, completed: false };
    if (isEdit) {
      const res = await updateTodo(todo.id, newTodo);
      setTodos(todos.map((t: any) => (t.id === todo.id ? res.data : t)));
    } else {
      const res = await createTodo(newTodo);
      setTodos([...todos, res.data]);
    }
    setTitle("");
    setDescription("");
    setTodo({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">{isEdit ? "Update" : "Add"} Todo</button>
    </form>
  );
};

export default TodoForm;
