import { createContext } from 'react';
import { Socket } from 'socket.io-client';

type ContextProps = {
  online: boolean;
  socket: Socket;
};

export const SocketContext = createContext({} as ContextProps);
