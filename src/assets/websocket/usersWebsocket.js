import { useRef, useEffect } from 'react';

const useUsersWebSocket = () => {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8080/project_backend/websocket/users`);

    ws.current.onopen = () => {
      console.log("ws opened");
    };

    ws.current.onclose = (event) => {
      console.log("ws closed");
    };

    ws.current.onerror = (error) => {
      console.log("ws error", error);
    };

    ws.current.onmessage = (e) => {
      
      
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return ws;
};

export default useUsersWebSocket;