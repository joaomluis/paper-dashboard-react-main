import { create } from "zustand";

const useNotificaionsStore = create(set => ({
  notifications: [],
  unreadCount: 0,
  setNotifications: (newNotifications) => set(state => {
    const uniqueNewNotifications = newNotifications.filter(
      newNotification => !state.notifications.some(
        existingNotification => existingNotification.sender === newNotification.sender && existingNotification.timestamp === newNotification.timestamp
      )
    );

    return {
      notifications: [...uniqueNewNotifications, ...state.notifications],
      unreadCount: state.unreadCount + uniqueNewNotifications.filter(notification => notification.not_read).length
    };
  }),
  markAsRead: () => set({ unreadCount: 0 }),
  markNotificationAsRead: (timestamp) => set(state => {
    const updatedNotifications = state.notifications.map(notification =>
      notification.timestamp === timestamp ? { ...notification, not_read: false } : notification
    );

    return { notifications: updatedNotifications };
  }),
}));

export default useNotificaionsStore;