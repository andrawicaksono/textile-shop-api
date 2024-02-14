import { Router } from 'express';
import { TodoService } from '../services/todo.service';
import { TodoController } from '../controllers/todo.controller';
import { body } from 'express-validator';

const todoRouter = Router();

const todoService = new TodoService();
const todoController = new TodoController(todoService);


todoRouter.get('/',
  todoController.getTodoList
);

export default todoRouter;
