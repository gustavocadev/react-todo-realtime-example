import { createContext } from 'react';
import type { Todo } from '../../types/Todo';

type ContextProps = {
  todos: Todo[];
};

export const TodoContext = createContext({} as ContextProps);
