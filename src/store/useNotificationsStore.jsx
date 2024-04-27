import { create } from "zustand";

const useNotificaionsStore = create(set => ({
  notifications: [],
  setNotifications: (newNotifications) => set(state => ({ notifications: [...state.notifications, ...newNotifications] })),
}));

export default useNotificaionsStore;