import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { API_URL } from '../../utils/constants';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
   const [socket, setSocket] = useState(null);

   useEffect(() => {
      const newSocket = io(API_URL); // Use environment variable for Socket URL
      setSocket(newSocket);

      newSocket.on('connect', () => {
         console.log('Socket connected');
      });

      newSocket.on('disconnect', () => {
         console.log('Socket disconnected');
      });

      return () => {
         newSocket.close();
      };
   }, []);

   return (
      <SocketContext.Provider value={socket}>
         {children}
      </SocketContext.Provider>
   );
};

export default SocketProvider;