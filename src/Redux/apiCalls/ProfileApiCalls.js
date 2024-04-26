import { profileActions } from "../Slices.js/ProfileSlice";
import { authActions } from "../Slices.js/authSlice";
import { toast } from "react-toastify";
import { request } from "../../utility/Axios";
import { userActions } from "../Slices.js/UserSlice";

// GET SINGLE-PROFILE
export function GetProfileUser(profileId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${profileId}`);
      dispatch(profileActions.getProfile(data));
    } catch (error) {
      toast.error(error);
    }
  };
}

// Upload-Profile-Photo
export function UploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/upload-profile-image`,
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(profileActions.uploadPhoto(data.profilePhoto));
      dispatch(authActions.setProfilePhoto(data.profilePhoto));
      toast.success(data.message);
      // modify user photo in local storage
      const user = JSON.parse(localStorage.getItem("user"));
      user.user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data);
    }
  };
}

// Update-Profile
export function UpdateProfileCall(profileId, Profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${profileId}`,
        Profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      if (!data) {
        throw new Error(data);
      }
      // console.log(data);
      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUserName(data.user.userName));

      // modify local-Storage
      const user = JSON.parse(localStorage.getItem("user"));
      user.user.userName = data?.user?.userName;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      toast.error(error.message);
    }
  };
}

// Delete-Profile
export function DeleteProfile(profileId) {
  return async (dispatch, getState) => {
    try {
      dispatch(userActions.setProfileIsDeleted(false));
      await request.delete(`api/users/profile/${profileId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(userActions.setProfileIsDeleted(true));
    } catch (error) {
      toast.error(error.message);
    }
  };
}
