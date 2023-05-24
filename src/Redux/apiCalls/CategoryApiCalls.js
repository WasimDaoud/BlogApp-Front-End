import { toast } from "react-toastify";
import { categoryActions } from "../Slices.js/CategorySlice";
import { request } from "../../utility/Axios";

// GET ALL CATEGORIES
export function GetAllCategories(){
    return async (dispatch,getState)=>{
        try{

            const { data } = await request.get(`/api/category`,{
                headers : {
                    Authorization : `Bearer ${getState().auth?.user?.token}`
                }
            });
            
            if(!data){
                toast.error("no response from server")
            }
            dispatch(categoryActions.getCategories(data));
        }catch(error){
            toast.error(error.response.data)
        }
    }
}