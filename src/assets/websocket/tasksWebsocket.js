import { useRef, useEffect } from 'react';

const useTasksWebSocket = () => {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8080/project_backend/websocket/tasks`);

    ws.current.onopen = () => {
      console.log("tasks ws opened");
    };

    ws.current.onclose = (event) => {
      console.log("tasks ws closed");
    };

    ws.current.onerror = (error) => {
      console.log("ws error", error);
    };

    ws.current.onmessage = (e) => {
      // to do refresh tasks store 
      console.log(e.data);
      console.log("someone updated the tasks");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return ws;
};

export default useTasksWebSocket;