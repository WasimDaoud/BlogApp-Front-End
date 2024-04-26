import { toast } from "react-toastify";
import { categoryActions } from "../Slices.js/CategorySlice";
import { request } from "../../utility/Axios";

// GET ALL CATEGORIES
export function GetAllCategories() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/category`, {
        headers: {
          Authorization: `Bearer ${getState().auth?.user?.token}`,
        },
      });
      dispatch(categoryActions.getCategories(data));
    } catch (error) {
      toast.error(error.response?.data);
    }
  };
}

// DELETE CATEGORY
export function DeleteCategory(categoryId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${getState().auth?.user?.token}`,
        },
      });
      dispatch(categoryActions.setCategoryIsDeleted(true));
    } catch (error) {
      toast.error(error.response.data);
    }
  };
}

// UPDATE CATEGORY
export function UpdateTheCategory(categoryId, updatedCategory) {
  return async (dispatch, getState) => {
    try {
      await request.put(
        `/api/category/${categoryId}`,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${getState().auth?.user?.token}`,
          },
        }
      );
      dispatch(categoryActions.setCategoryIsUpdated(true));
      toast.success("Category has been Updated Successfully");
    } catch (error) {
      toast.error(error.response);
    }
  };
}

// CREATE CATEGORY
export function CreateCategory(newCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/category`, newCategory, {
        headers: {
          Authorization: `Bearer ${getState().auth?.user?.token}`,
        },
      });
      dispatch(categoryActions.setCategoryIsCreated(true));
    } catch (error) {
      toast.error(error.response.data);
    }
  };
}
