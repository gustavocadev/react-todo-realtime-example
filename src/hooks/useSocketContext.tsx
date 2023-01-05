import { useContext } from 'react';
import { SocketContext } from '../context/socket';

export const useSocketContext = () => {
  return useContext(SocketContext);
};
