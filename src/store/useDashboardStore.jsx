import { create } from 'zustand';
import useUserStore from './useUserStore';
import { toast, Slide } from 'react-toastify';


const useDashboardStore = create((set, get) => {
  
  const fetchUsersData = async () => {
    const usersDataRequest = "http://localhost:8080/project_backend/rest/dashboard/users-stats";
    const token = useUserStore.getState().token;

    try {
      const response = await fetch(usersDataRequest, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token
        }
      });

      if (response.ok) {
        const usersData = await response.json();

        set(() => ({ usersData: usersData }));
        
        
      } else {
        const errorMessage = await response.text();

        console.error('Failed to fetch users data', errorMessage);
      }
    } catch (error) {
      console.error('Failed to fetch users data', error);
    }
  }
  

  const fetchTasksData = async () => {
    const tasksDataRequest = "http://localhost:8080/project_backend/rest/dashboard/tasks-stats";
    const token = useUserStore.getState().token;

    try {
      const response = await fetch(tasksDataRequest, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token
        }
      });

      if (response.ok) {
        const tasksData = await response.json();

        set(() => ({ tasksData: tasksData }));
        
        
      } else {
        const errorMessage = await response.text();

        console.error('Failed to fetch tasks data', errorMessage);
      }
    } catch (error) {
      console.error('Failed to fetch tasks data', error);
    }
  }

  

  return {
    usersData: [],
    tasksData: [],
    setUsersData: (usersData) => set(state => ({ usersData })),
    setTasksData: (tasksData) => set(state => ({ tasksData })),
    fetchUsersData,
    fetchTasksData,
    
  };
});

export default useDashboardStore;