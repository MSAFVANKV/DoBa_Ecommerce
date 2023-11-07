import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { adminbaseURL } from '../../Base/Constent'

export const signupAdmin = createAsyncThunk('admin/signup', async ({ email, password }) => {
    try {
        const res = await axios.post(`${adminbaseURL}/signup` ,{ email, password },{withCredentials:true});
        return res.data
    } catch (error) {
        console.log(error,'error signupadmin slice');
        throw Error(err.response?.data?.msg || "Login failed");
    }
})
export const loginAdmin = createAsyncThunk('admin/login', async ({ email, password }) => {
    try {
        const res = await axios.post(`${adminbaseURL}/login`, { email, password }, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.log(error, 'error loginAdmin slice');
        throw new Error(error.response?.data?.msg || "Login failed"); // Throw the error with the correct error message
    }
});

// logout
export const logoutAdmin = createAsyncThunk('admin/logout', async () => {
    try {
        await axios.get(`${adminbaseURL}/logout`, { withCredentials: true });
        return true;
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
});



export const adminSlice = createSlice({
    name:"admin",
    initialState: {
        admin:null,
        isLoggedIn: false,
    },
    reducers: {
        login:(state,action) => {
            state.admin = action.payload
        }
    },
    extraReducers: builder => {
        builder
        .addCase(signupAdmin.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(signupAdmin.fulfilled, (state) => {
            state.status = 'succeeded';
            state.isLoggedIn = true;
        })
        .addCase(signupAdmin.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload; // Store the error message from the server
        });
    }
})

export const { login } = adminSlice.actions

export const selectAdmin = (state) => state.admin.admin;

export default adminSlice.reducer