import { create } from "zustand";
import useUserStore from "./useUserStore";
import { toast, Slide } from "react-toastify";

const useAllUsersStore = create((set, get) => {
  const getActiveUsers = async () => {
    const token = useUserStore.getState().token;
    const activeUsersRequest =
      "http://localhost:8080/project_backend/rest/users/activeUsers";

    try {
      const response = await fetch(activeUsersRequest, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (response.ok) {
        const activeUsers = await response.json();

        set(() => ({ data: activeUsers }));
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const softDeleteUser = async (id) => {
    const token = useUserStore.getState().token;
    let deleteCategoryRequest = `http://localhost:8080/project_backend/rest/users/deleteUser`;
    try {
      const response = await fetch(deleteCategoryRequest, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
          username: id,
        },
      });

      if (response.ok) {
        toast.info(`${id} status set to inactive`, {
          position: "top-center",
          autoClose: 3000,
          transition: Slide,
          hideProgressBar: true,
          theme: "colored",
        });
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error disabling user account:", error);
    }
  };

  const restoreUser = async (id) => {
    const token = useUserStore.getState().user.token;
    let deleteCategoryRequest = `http://localhost:8080/project_backend/rest/users/restoreUser/${id}`;
    try {
      const response = await fetch(deleteCategoryRequest, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (response.ok) {
        toast.info(`${id} status set to active`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error restoring user:", error);
    }
  };

  const deleteUserPerma = async (id) => {
    const token = useUserStore.getState().user.token;
    let deleteCategoryRequest = `http://localhost:8080/project_backend/rest/users/removeUser`;
    try {
      const response = await fetch(deleteCategoryRequest, {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
          username: id,
        },
      });

      if (response.ok) {
        toast.info("User deleted permanently", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "colored",
        });

        return Promise.resolve({ success: true }); 
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });

        return Promise.resolve({ success: false });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateOtherUserProfile = async (username, updatedUserData) => {
    const token = useUserStore.getState().token;

    try {
      const response = await fetch(
        "http://localhost:8080/project_backend/rest/users/updateProfilePO",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: token,
            username: username,
          },
          body: JSON.stringify(updatedUserData),
        }
      );

      if (response.ok) {
        toast.success("User updated successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });

        getAllUsers();
      } else {
        const errorMessage = await response.text();

        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const updatePassowrd = async (
    currentPassword,
    newPassword,
    confirmNewPassword
  ) => {
    const url = `http://localhost:8080/project_backend/rest/users/updatePassword`;

    const token = useUserStore.getState().token;

    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmNewPassword,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Password updated successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });

        return Promise.resolve();
      } else {
        const errorMessage = await response.text();

        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const updateUserRole = async (username, newRole) => {
    const token = useUserStore.getState().token;

    const url = `http://localhost:8080/project_backend/rest/users/${username}/updateUserRole`;

    const data = {
      typeOfUser: newRole,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Role updated successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });

        return Promise.resolve();
      } else {
        const errorMessage = await response.text();

        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const sendUserPasswordResetEmail = async (email) => {
    const url = `http://localhost:8080/project_backend/rest/users/recoverPassword/${email}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.info("Password reset email sent successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });

        return Promise.resolve();
      } else {
        const errorMessage = await response.text();

        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const recoverPassword = async (token, newPassword, confirmNewPassword) => {
    const url = `http://localhost:8080/project_backend/rest/users/resetPassword/${token}`;

    const data = {
      newPassword: newPassword,
      confirmPassword: confirmNewPassword,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Password reset successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });

        return Promise.resolve({ success: true }); // para ter uma response e possa usar then em caso de sucesso no componente
      } else {
        const errorMessage = await response.text();

        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });

        return Promise.resolve({ success: false });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const confirmAccount = async (token, password, confirmPassword) => {
    const url = `http://localhost:8080/project_backend/rest/users/confirmAccount/${token}`;

    const data = {
      newPassword: password,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Account confirmed successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });

        return Promise.resolve({ success: true }); // para ter uma response e possa usar then em caso de sucesso no componente
      } else {
        const errorMessage = await response.text();

        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });

        return Promise.resolve({ success: false });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const resendUserVerificationEmail = async (username) => {
    const url = `http://localhost:8080/project_backend/rest/users/resendVerificationEmail`;
    const token = useUserStore.getState().token;

    const data = {
      username: username,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Verification email sent successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
      } else {
        const errorMessage = await response.text();

        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const createUser = async (user) => {
    const token = useUserStore.getState().token;

    const url = `http://localhost:8080/project_backend/rest/users/addUserByPO`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        toast.success("User created successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });

        getAllUsers();

        return Promise.resolve();
      } else {
        const errorMessage = await response.text();

        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  };

  const getAllUsers = async () => {
    const token = useUserStore.getState().token;

    const allUsersRequest =
      "http://localhost:8080/project_backend/rest/users/all";

    try {
      const response = await fetch(allUsersRequest, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (response.ok) {
        const allUsers = await response.json();

        set(() => ({ allUsers: allUsers }));

        return allUsers;
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const getUserByUsername = async (username) => {
    const token = useUserStore.getState().token;

    const userByUsernameRequest = `http://localhost:8080/project_backend/rest/users/${username}`;

    try {
      const response = await fetch(userByUsernameRequest, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (response.ok) {
        const user = await response.json();

        return user;
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const getMessagesBetweenTwoUsers = async (sender, recipient) => {
    const token = useUserStore.getState().token;

    const messagesRequest = `http://localhost:8080/project_backend/rest/messages/${sender}/${recipient}`;

    try {
      const response = await fetch(messagesRequest, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (response.ok) {
        const messages = await response.json();

        return messages;
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  return {
    data: [],
    allUsers: [],

    setData: (data) => set((state) => ({ data })),
    setAllUsers: (allUsers) => set((state) => ({ allUsers })),
    getActiveUsers,
    getAllUsers,
    softDeleteUser,
    restoreUser,
    deleteUserPerma,
    updateOtherUserProfile,
    updatePassowrd,
    updateUserRole,
    createUser,
    getUserByUsername,
    sendUserPasswordResetEmail,
    recoverPassword,
    confirmAccount,
    resendUserVerificationEmail,
    getMessagesBetweenTwoUsers,
  };
});

export default useAllUsersStore;
