import { Todo } from '../../types/Todo';
import type { TodoState } from './';

type TodoAction = {
  type: 'getTodos';
  payload: Todo[];
};

export const todoReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case 'getTodos':
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};
