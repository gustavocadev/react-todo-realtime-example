import { useReducer } from 'react';
import type { ReactNode } from 'react';
import { SocketContext, socketReducer } from './';
import { useSocket } from '../../hooks/useSocket';

export type SocketState = {};

const SOCKET_INITIAL_STATE: SocketState = {};

type Props = {
  children: ReactNode;
};

export const SocketProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(socketReducer, SOCKET_INITIAL_STATE);
  const { online, socket } = useSocket(
    'https://node-todo-realtime-app.onrender.com'
  );
  return (
    <SocketContext.Provider
      value={{
        ...state,
        online,
        socket,
        // actions
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
