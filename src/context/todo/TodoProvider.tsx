import { useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import { TodoContext, todoReducer } from './';
import type { Todo } from '../../types/Todo';
import { useSocketContext } from '../../hooks/useSocketContext';

export type TodoState = {
  todos: Todo[];
};

const TODO_INITIAL_STATE: TodoState = {
  todos: [],
};

type Props = {
  children: ReactNode;
};

export const TodoProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(todoReducer, TODO_INITIAL_STATE);
  const { socket, online } = useSocketContext();
  useEffect(() => {
    socket.on('getTodos', (todos: Todo[]) => {
      dispatch({
        type: 'getTodos',
        payload: todos,
      });
    });
  }, []);

  return (
    <TodoContext.Provider
      value={{
        ...state,
        // actions
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
