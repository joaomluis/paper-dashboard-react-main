import { create } from "zustand";
import useUserStore from "./useUserStore";
import { toast, Slide } from "react-toastify";

const useTasksStore = create((set) => {
  const initialState = {
    selectedCategory: "",
    selectedUser: "",
    setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    reset: () => set({ selectedCategory: "", selectedUser: "" }),
  };

  set(() => initialState);

  const getActiveTasks = async (selectedUsername, selectedCategoryId) => {
    let url = `http://localhost:8080/project_backend/rest/tasks/all`;

    if (selectedUsername) {
      url += `?username=${selectedUsername}`;
    }

    if (selectedCategoryId) {
      if (selectedUsername) {
        url += `&category=${selectedCategoryId}`;
      } else {
        url += `?category=${selectedCategoryId}`;
      }
    }

    const token = useUserStore.getState().token;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (response.ok) {
        const filteredTasks = await response.json();
        set(() => ({ activeTasksdata: filteredTasks }));
      } else {
        return null;
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      return null;
    }
  };

  getActiveTasks();

  const updateTaskState = async (
    taskId,
    state,
    selectedUsername,
    selectedCategory
  ) => {
    const token = useUserStore.getState().user.token;

    let updateTaskRequest = `http://localhost:8080/project_backend/rest/tasks/${taskId}/status`;
    try {
      const response = await fetch(updateTaskRequest, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
          newState: state,
        },
      });

      if (response.ok) {
        console.log("Task state updated");

        getActiveTasks(selectedUsername, selectedCategory);
      } else {
        console.error("Failed to update task state");
      }
    } catch (error) {
      console.error("Error updating task state:", error);
    }
  };

  const createTask = async (
    task,
    categoryId,
    selectedUser,
    selectedCategory
  ) => {
    const token = useUserStore.getState().user.token;
    let createTaskRequest =
      "http://localhost:8080/project_backend/rest/tasks/createTask";

    try {
      const response = await fetch(createTaskRequest, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
          categoryId: categoryId,
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        toast.info("Task created successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });

        getActiveTasks(selectedUser, selectedCategory);
      } else {
        const error = await response.text();
        console.error("Failed to create task:", error);

        toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async (
    taskId,
    idCategory,
    taskToUpdate,
    setShowModal,
    selectedUser,
    selectedCategory
  ) => {
    const token = useUserStore.getState().user.token;

    try {
      const response = await fetch(
        "http://localhost:8080/project_backend/rest/tasks/updateTask",
        {
          method: "PUT",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: token,
            categoryId: idCategory,
            taskId: taskId,
          },
          body: JSON.stringify(taskToUpdate),
        }
      );
      if (response.ok) {
        toast.info("Task updated successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
        setShowModal();
        getActiveTasks(selectedUser, selectedCategory);
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const updateTaskActiveState = async (
    taskId,
    selectedUsername,
    selectedCategory
  ) => {
    const token = useUserStore.getState().user.token;
    let setTaskStatusRequest = `http://localhost:8080/project_backend/rest/tasks/${taskId}/softDelete`;

    try {
      const response = await fetch(setTaskStatusRequest, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
          taskId: taskId,
        },
      });

      if (response.ok) {
        toast.info("Task state updated successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });

        getActiveTasks(selectedUsername, selectedCategory);
        getInactiveTasks();
      } else {
        const error = await response.text();

        toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error updating task state:", error);
    }
  };

  const deleteTaskByUser = async (username) => {
    let url = `http://localhost:8080/project_backend/rest/tasks/deleteTasksByUsername/${username}`;

    const token = useUserStore.getState().user.token;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (response.ok) {
        toast.info("Tasks deleted successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });
        getActiveTasks();
        getInactiveTasks();
      } else {
        const error = await response.text();
        console.error(error);
        toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // SEPARADOR CONTEUDO DA TABELA COM AS INACTIVE TASKS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const getInactiveTasks = async () => {
    const inactiveTasksRequest =
      "http://localhost:8080/project_backend/rest/tasks/getInactiveTasks";
    const token = useUserStore.getState().user.token;

    try {
      const response = await fetch(inactiveTasksRequest, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (response.ok) {
        const inactiveTasks = await response.json();

        set(() => ({ data: inactiveTasks }));
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const deleteTaskPerma = async (id) => {
    const token = useUserStore.getState().user.token;
    let deleteTaskRequest = `http://localhost:8080/project_backend/rest/tasks/${id}/hardDeleteTask`;
    try {
      const response = await fetch(deleteTaskRequest, {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
          username: id,
        },
      });

      if (response.ok) {
        toast.info("Task deleted permanently", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          theme: "colored",
        });

        getInactiveTasks();
      } else {
        const error = await response.text();
        console.error(error);
        toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          transition: Slide,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return {
    ...initialState,
    activeTasksdata: [],
    data: [],
    updateTaskState,
    getActiveTasks,
    getInactiveTasks,
    deleteTaskPerma,
    createTask,
    updateTaskActiveState,
    updateTask,
    deleteTaskByUser,
    setData: (data) => set((state) => ({ data })),
    selectedCategory: "",
    selectedUser: "",
    setSelectedCategory: (selectedCategory) =>
      set((state) => ({ selectedCategory })),
    setSelectedUser: (selectedUser) => set((state) => ({ selectedUser })),
  };
});

export default useTasksStore;
