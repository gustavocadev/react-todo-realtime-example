import { io } from 'socket.io-client';

import { useState, useEffect, useMemo } from 'react';

export const useSocket = (serverPath: string) => {
  const socket = useMemo(() => {
    return io(serverPath, {
      transports: ['websocket'],
    });
  }, [serverPath]);

  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });
  }, []);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, []);
  return {
    socket,
    online,
  };
};
