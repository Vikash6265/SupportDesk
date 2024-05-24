import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const userExist = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : userExist ? userExist : null,
        isLoading : false,
        isError : false,
        isSuccess : false,
        message : ""
    },
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(registerUser.pending,(state,action)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.message = "";
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.user = null;
            state.message = action.payload;
        })

        .addCase(loginUser.pending,(state,action)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.message = "";
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.user = null;
            state.message = action.payload;
        })

        .addCase(logOutUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.user = null;
            state.message = "";
        })      
    }
});

export default authSlice.reducer;

export const registerUser = createAsyncThunk("REGISTER/USER",async(formData,thunkAPI)=>{
    try {
        return await authService.registerData(formData);
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Login User

export const loginUser = createAsyncThunk("LOGIN/USER",async(formData,thunkAPI)=>{
    try {
        return await authService.loginData(formData);
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// LogOut User

export const logOutUser = createAsyncThunk("LOGOUT/USER",async() =>{
    localStorage.removeItem("user");
});