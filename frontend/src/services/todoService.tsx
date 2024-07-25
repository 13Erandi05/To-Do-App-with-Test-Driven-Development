import axios from "axios";

const API_URL = "http://localhost:3000/todos";

export const getTodos = () => axios.get(API_URL);
export const getTodo = (id: number) => axios.get(`${API_URL}/${id}`);
export const createTodo = (todo: any) => axios.post(API_URL, todo);
export const updateTodo = (id: number, todo: any) =>
  axios.put(`${API_URL}/${id}`, todo);
export const deleteTodo = (id: number) => axios.delete(`${API_URL}/${id}`);
