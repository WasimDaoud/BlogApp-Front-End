import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({

    name : "category" ,
    
    initialState : {
        allCategories : null ,
        updateCategory : {} ,
        categoryIsDeleted : false ,
        categoryIsUpdated : false ,
        categoryIsCreated : false
    },

    reducers : {
        getCategories(state , action){
            state.allCategories = action.payload;
        },
        setCategoryIsDeleted(state , action){
            state.categoryIsDeleted = action.payload;
        },
        setCategoryIsUpdated(state , action){
            state.categoryIsUpdated = action.payload;
        },
        setCategoryIsCreated(state , action){
            state.categoryIsCreated = action.payload;
        },
        setUpdateCategory(state,action){
            state.updateCategory = action.payload;
        }
    }
});

const categoryReducer = CategorySlice.reducer;
const categoryActions = CategorySlice.actions;

export { categoryReducer , categoryActions } 