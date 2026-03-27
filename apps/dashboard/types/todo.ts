import { Todo } from './todo';

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type TodoList = TodoItem[];