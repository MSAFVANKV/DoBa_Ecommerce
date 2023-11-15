import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {  userURL } from '../../Base/Constent'

export const singleFormEnquiry = createAsyncThunk('user/form', async ({ formState }) => {
    try {
        const res = await axios.post(`${userURL}/singleform` ,{ formState });
        return res.data
    } catch (error) {
        console.log(error,'error form submition slice');
        throw Error(err.response?.data?.msg || "Login failed");
    }
})
export const getUserSingleForm = createAsyncThunk('user/form', async () => {
    try {
        const res = await axios.get(`${userURL}/singleform/getall` );
        return res.data;
    } catch (error) {
        console.log(error, 'error SingleForm slice');
        throw new Error(error.response?.data?.msg || "SingleForm failed"); // Throw the error with the correct error message
    }
});


export const SingleFormSlice = createSlice({
    name:"form",
    initialState: {
        form:null,
    },
    reducers: {
        formsingle: (state, action) => {
            state.form = action.payload; // Update the form field in the state
        }
    },
    extraReducers: builder => {
        builder
        .addCase(singleFormEnquiry.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(singleFormEnquiry.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.form = action.payload; // Update the form field in the state
        })
        
        .addCase(singleFormEnquiry.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload; // Store the error message from the server
        });
    }
})

export const { formsingle } = SingleFormSlice.actions

export const selectSigleForm = (state) => state.form.form;

export default SingleFormSlice.reducer