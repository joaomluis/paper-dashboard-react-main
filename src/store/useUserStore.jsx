import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const useUserStore = create(persist((set) => ({
    user: null,
    userType: null,
    isLoggedIn: false,
    firstName: null,
    username: null,
    imgURL: null,
    token: null,
    setUser: (user) => set((state) => ({...state,
                                        user: user,
                                        userType: user.typeOfUser,
                                        isLoggedIn: true,
                                        firstName: user.firstName,
                                        username: user.username,
                                        imgURL: user.imgURL,
                                        token: user.token})),
    setLoggedIn: (value) => set({ isLoggedIn: value }),

    }),
    
    {
        name: 'user-storage',
        getStorage: () => sessionStorage,
    }

));


export default useUserStore;