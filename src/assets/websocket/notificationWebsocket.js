import { useRef, useEffect } from 'react';

const useNotificationsWebSocket = () => {
  const ws = useRef(null);

  const connect = (isLoggedIn) => {
    if (isLoggedIn && ws.current === null) {
      ws.current = new WebSocket(`ws://localhost:8080/project_backend/websocket/notification`);

      ws.current.onopen = () => {
        console.log("notification ws opened");
      };

      ws.current.onclose = (event) => {
        console.log("ws closed");
      };

      ws.current.onerror = (error) => {
        console.log("ws error", error);
      };

      ws.current.onmessage = (e) => {
        // handle incoming messages
      };
    }
  }

  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []); 

  return { connect };
};

export default useNotificationsWebSocket;