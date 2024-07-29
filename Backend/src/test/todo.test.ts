import request from "supertest";
import { app } from "../index"; // Adjust the import based on your file structure
import { AppDataSource } from "../data-source";
import { Todo } from "../entity/ToDo";

// Initialize the data source before running tests
beforeAll(async () => {
  await AppDataSource.initialize(); // Initialize TypeORM connection
});

// Clear the database before each test
beforeEach(async () => {
  await AppDataSource.getRepository(Todo).clear();
});

describe("Todo API", () => {
  it("should fetch all todos", async () => {
    await AppDataSource.getRepository(Todo).save({
      title: "Test Todo",
      description: "Test Description",
      completed: false,
    });

    const response = await request(app).get("/todos");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch a single todo by ID", async () => {
    const newTodo = await AppDataSource.getRepository(Todo).save({
      title: "Test Todo",
      description: "Test Description",
      completed: false,
    });

    const response = await request(app).get(`/todos/${newTodo.id}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Test Todo");
  });

  it("should return 404 when fetching a non-existent todo by ID", async () => {
    const response = await request(app).get(`/todos/999`);
    expect(response.status).toBe(404);
    expect(response.text).toBe("Todo not found");
  });

  it("should create a new todo", async () => {
    const response = await request(app).post("/todos").send({
      title: "New Todo",
      description: "New Description",
      completed: false,
    });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("New Todo");
  });

  it("should return 400 when creating a todo with invalid data", async () => {
    const response = await request(app).post("/todos").send({
      title: "",
      description: "No Title",
      completed: false,
    });

    expect(response.status).toBe(400);
  });

  it("should update a todo by ID", async () => {
    const todo = await AppDataSource.getRepository(Todo).save({
      title: "Update Todo",
      description: "Update Description",
      completed: false,
    });

    const response = await request(app).put(`/todos/${todo.id}`).send({
      title: "Updated Todo",
      description: "Updated Description",
      completed: true,
    });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Todo");
    expect(response.body.completed).toBe(true);
  });

  it("should return 404 when updating a non-existent todo by ID", async () => {
    const response = await request(app).put(`/todos/999`).send({
      title: "Updated Todo",
      description: "Updated Description",
      completed: true,
    });

    expect(response.status).toBe(404);
    expect(response.text).toBe("Todo not found");
  });

  it("should delete a todo by ID", async () => {
    const todo = await AppDataSource.getRepository(Todo).save({
      title: "Delete Todo",
      description: "Delete Description",
      completed: false,
    });

    const response = await request(app).delete(`/todos/${todo.id}`);
    expect(response.status).toBe(204);

    // Verify the todo is deleted
    const deletedTodo = await AppDataSource.getRepository(Todo).findOne({
      where: { id: todo.id },
    });
    expect(deletedTodo).toBeNull();
  });

  it("should return 404 when deleting a non-existent todo by ID", async () => {
    const response = await request(app).delete(`/todos/999`);
    expect(response.status).toBe(404);
    expect(response.text).toBe("Todo not found");
  });

  it("should return 400 when updating a todo with invalid data", async () => {
    const todo = await AppDataSource.getRepository(Todo).save({
      title: "Update Todo",
      description: "Update Description",
      completed: false,
    });

    const response = await request(app).put(`/todos/${todo.id}`).send({
      title: "",
      description: "Updated Description",
      completed: true,
    });

    expect(response.status).toBe(400);
  });
});
