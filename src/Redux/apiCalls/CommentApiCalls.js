import { toast } from "react-toastify";
import { commentActions } from "../Slices.js/CommentSlice";
import { request } from "../../utility/Axios";


// GET-ALL-COMMENTS
export function GetAllComments(){
    return async(dispatch,getState) => {
        try {
            const { data } = await request.get(`/api/comments/`,{
                headers : {
                    Authorization : `Bearer ${getState().auth?.user?.token}`
                }
            }); 
            if(!data){
                toast.error("no response from server");
            }
            dispatch(commentActions.getAllComments(data));
        } catch (error) {
            toast.error(error.response.data);
        }
    }
}

// DELETE-COMMENT
export function DeleteComment( commentId ){
    return async(dispatch,getState) => {
        try {
            await request.delete(`/api/comments/${commentId}`,{
                headers : {
                    Authorization : `Bearer ${getState().auth.user?.token}`
                }
            }); 
        } catch (error) {
            toast.error(error.response.data);
        }
    }
}

// UPDATE-COMMENT
export function UpdateTheComment( commentId , updatedComment){
    return async(dispatch,getState) => {
        try {
            const { data } = await request.put(`/api/comments/${commentId}`, updatedComment , {
                headers : {
                    Authorization : `Bearer ${getState().auth.user?.token}`
                }
            }); 
            if(!data){
                toast.error("no response from server");
            }
            dispatch(commentActions.setComment(data));
        } catch (error) {
            toast.error(error.response.data);
        }
    }
}

// CREATE-COMMENT
export function CreateComment( newComment ){
    return async(dispatch,getState) => {
        try {
            const { data } = await request.post(`/api/comments/` , newComment , {
                headers : {
                    Authorization : `Bearer ${getState().auth.user?.token}`
                }
            }); 
            if(!data){
                toast.error("no response from server");
            }
            dispatch(commentActions.setComment(data));
        } catch (error) {
            toast.error(error.response.data);
        }
    }
}