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
  


  

  return {
    usersData: [],
    setUsersData: (usersData) => set(state => ({ usersData })),
    fetchUsersData,
    
  };
});

export default useDashboardStore;