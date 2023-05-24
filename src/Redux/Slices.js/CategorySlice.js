import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({

    name : "category" ,
    
    initialState : {
        allCategories : null ,
    },

    reducers : {
        getCategories(state , action){
            state.allCategories = action.payload;
        }
    }
});

const categoryReducer = CategorySlice.reducer;
const categoryActions = CategorySlice.actions;

export { categoryReducer , categoryActions } 