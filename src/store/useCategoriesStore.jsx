import { create } from 'zustand';
import useUserStore from './useUserStore';
import { toast, Slide } from 'react-toastify';


const useCategoriesStore = create((set, get) => {
  const fetchCategories = async () => {
    const categoriesRequest = "http://localhost:8080/project_backend/rest/categories/getAllCategories";
    const token = useUserStore.getState().token;

    try {
      const response = await fetch(categoriesRequest, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token
        }
      });

      if (response.ok) {
        const categories = await response.json();

        set(() => ({ categories: categories }));
        
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const createCategory = async (category) => {
    const token = useUserStore.getState().user.token;
    const createCategoryRequest = "http://localhost:8080/project_backend/rest/categories/createCategory";
    try {
      const response = await fetch(createCategoryRequest, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token
        },
        body: JSON.stringify(category)
      });

      if (response.ok) {
        toast.success('Category created successfully', {position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        transition: Slide,
        theme: "colored"
        });

        fetchCategories();
        return Promise.resolve({ success: true });
        
      } else {
        const errorMessage = await response.text();

        toast.error(errorMessage, {position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        transition: Slide,
        theme: "colored"
        });

        return Promise.resolve({ success: false });
        
      }
    } catch (error) {
      console.error("Error creating category:", error);
      
    }
  }



  const deleteCategory = async (id) => {
    const token = useUserStore.getState().user.token;
    let deleteCategoryRequest = `http://localhost:8080/project_backend/rest/categories/delete/${id}`;
  try {
    const response = await fetch(deleteCategoryRequest, {
      method: "DELETE",
      headers: {
        'Accept': '*/*',
        "Content-Type": "application/json",
        token: token
      }
    });

    if (response.ok) {
      toast.info('Category deleted successfully', {position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      transition: Slide,
      theme: "colored"
      });
      
      fetchCategories();
   
      
    } else {
      const errorMessage = await response.text();

      toast.error(errorMessage, {position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      transition: Slide,
      theme: "colored"
      });
     
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    
  }};

  


  

  return {
    categories: [],
    setData: (categories) => set(state => ({ categories })),
    fetchCategories,
    createCategory,
    deleteCategory
    
  };
});

export default useCategoriesStore;