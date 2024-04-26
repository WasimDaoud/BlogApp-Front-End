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
      toast.error(error.message);
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
      console.log(data)

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

// Verify Email
export function VerifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(
        `/api/auth/${userId}/verify-email/${token}`
      );
      dispatch(authActions.setEmailIsVerified());
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// Reset-Password-request-apiCall
export function ResetPasswordApiReq(email) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/auth/reset-password/${email}`);
    } catch (error) {
      console.log(error.response);
    }
  };
}

// Reset-password Api-call
export function ResetPassword(userId, newPassword, token) {
  return async () => {
    try {
      const {
        data,
      } = await request.put(`api/auth/${userId}/reset-password/${token}`, {
        newPassword,
      });
      toast.success("password has been changed successfully.. please login");
    } catch (error) {
      console.log(error);
    }
  };
}
