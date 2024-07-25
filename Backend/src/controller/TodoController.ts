// src/controller/TodoController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Todo } from "../entity/ToDo";

export class TodoController {
  static getAll = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todos = await todoRepository.find();
    res.send(todos);
  };

  static getOne = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOneBy({
      id: parseInt(req.params.id),
    });
    if (todo) {
      res.send(todo);
    } else {
      res.status(404).send("Todo not found");
    }
  };

  static create = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = todoRepository.create(req.body);
    await todoRepository.save(todo);
    res.status(201).send(todo);
  };

  static update = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOneBy({
      id: parseInt(req.params.id),
    });
    if (todo) {
      todoRepository.merge(todo, req.body);
      await todoRepository.save(todo);
      res.send(todo);
    } else {
      res.status(404).send("Todo not found");
    }
  };

  static delete = async (req: Request, res: Response) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOneBy({
      id: parseInt(req.params.id),
    });
    if (todo) {
      await todoRepository.remove(todo);
      res.status(204).send();
    } else {
      res.status(404).send("Todo not found");
    }
  };
}
