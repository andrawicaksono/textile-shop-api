import axios from 'axios';
import { ApplicationError } from '../utils/error';

export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export class TodoService {
  getTodoList = async(): Promise<[Todo | null, Error | null]> => {
    try {
      let config = {
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/todos/',
        headers: { 
            'Content-Type': 'application/json'
        }
    };

      let response = await axios(config);
      return [response.data, null];
    } catch (error: any) {
      return [null, error]
    }
  }
}
