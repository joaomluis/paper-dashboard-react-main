import { useRef, useEffect } from 'react';

const useNotificationsWebSocket = (isLoggedIn) => {
  const ws = useRef(null);

  useEffect(() => {
    if (isLoggedIn) {
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

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [isLoggedIn]); // dependency array

  return ws;
};

export default useNotificationsWebSocket;