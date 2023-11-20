import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userURL } from "../../Base/Constent";

export const getFeedbackInfo = createAsyncThunk('form/feedback', async () => {
  const res = await axios.get(`${userURL}/form/feedback/getall`);
  return res.data;
});

getFeedbackInfo.pending
getFeedbackInfo.fulfilled
getFeedbackInfo.rejected

export const FeedBackSlice = createSlice({
  name: "feedback",
  initialState: {
    phone: "",
    email: "",
    feedback: "",
    list: [],
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    setTasks: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: builder => {
    builder
        .addCase(getFeedbackInfo.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getFeedbackInfo.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.list = action.payload;
        })
        .addCase(getFeedbackInfo.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
}
});

export const { setEmail, setFeedback, setPhone } = FeedBackSlice.actions;

export const selectEmail = (state) => state.feedback.email;  // Fixed typo in selectEmail
export const selectPhone = (state) => state.feedback.phone;
export const selectFeedback = (state) => state.feedback.feedback;
export const selectTasks = (state) => state.feedback.list;

export default FeedBackSlice.reducer;
