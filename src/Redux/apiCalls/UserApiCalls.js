import { toast } from "react-toastify";
import { request } from "../../utility/Axios";
import { userActions } from "../Slices.js/UserSlice";


// GET ALL-USERS
export function GetAllUsers() {
    return async (dispatch,getState) => {
      try {
        const { data } = await request.get(`/api/users/profile`,{
            headers : `Bearer ${getState().auth?.user?.token}`
        });
        dispatch(userActions.getAllUsers(data));
      } catch (error) {
        toast.error(error);
      }
    };
  }