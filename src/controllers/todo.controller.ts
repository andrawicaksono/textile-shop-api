import { NextFunction, Request, Response } from 'express';
import { TodoService } from '../services/todo.service';

export class TodoController {
  private todoService: TodoService;

  constructor(todoService: TodoService) {
    this.todoService = todoService;
  }

  getTodoList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [todos, error] = await this.todoService.getTodoList();

      if (error) {
        throw error;
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Get todo list success",
        data: todos
      });
    } catch (error: any) {
      next(error)
    }
  };
}
