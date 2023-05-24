// import { authActions } from "../../Slices.js/authSlice";
import { request } from "../../utility/Axios";
import { authActions } from "../Slices.js/authSlice";
import { toast } from "react-toastify";

// Login User
export function LoginUser(user) {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (!data.ok) {
        dispatch(authActions.error(data.error));
      }

      dispatch(authActions.login(data));
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// LogOut User
export function LogOutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
  };
}

// Register User
export function RegisterUser(user) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/auth/register`, user);

      if (!data) {
        dispatch(authActions.error(data.error));
      }

      dispatch(authActions.register(data.message));
      toast.success(data.message);
    } catch (error) {
      dispatch(authActions.error(error.response.data));
      toast.error(getState().auth.error);
    }
  };
}
