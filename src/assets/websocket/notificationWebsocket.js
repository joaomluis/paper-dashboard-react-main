import { useRef, useEffect } from 'react';
import useNotificationsStore from '../../store/useNotificationsStore.jsx';

const useNotificationsWebSocket = (username) => {
  const ws = useRef(null);
  const setNotifications = useNotificationsStore((state) => state.setNotifications);
  const notifications = useNotificationsStore((state) => state.notifications);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8080/project_backend/websocket/notifications/${username}`);

    ws.current.onopen = () => {
      console.log("notifications ws opened");
    };

    ws.current.onclose = () => {
      console.log("notifications ws closed");
    };

    ws.current.onerror = (error) => {
      console.log("ws error", error);

    };

    ws.current.onmessage = (e) => {
      const notification = JSON.parse(e.data);
      setNotifications(notification);
      console.log("notifications", notifications);
      
      
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return ws;
};

export default useNotificationsWebSocket;