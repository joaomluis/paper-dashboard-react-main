import { useRef, useEffect } from 'react';

const useCategoriesWebSocket = () => {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8080/project_backend/websocket/categories`);

    ws.current.onopen = () => {
      console.log("categories ws opened");
    };

    ws.current.onclose = (event) => {
      console.log("categories ws closed");
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

export default useCategoriesWebSocket;