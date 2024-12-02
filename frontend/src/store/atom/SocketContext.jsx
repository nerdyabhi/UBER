import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { API_URL } from '../../utils/constants';

export const SocketContext = createContext();

const SocketProvider = ({ children, isLoggedIn }) => {
   const [socket, setSocket] = useState(null);

   useEffect(() => {
      if (isLoggedIn) {
         const newSocket = io(process.env.REACT_APP_SOCKET_URL); // Use environment variable for Socket URL
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
      }
   }, [isLoggedIn]);

   return (
      <SocketContext.Provider value={socket}>
         {children}
      </SocketContext.Provider>
   );
};

export default SocketProvider;