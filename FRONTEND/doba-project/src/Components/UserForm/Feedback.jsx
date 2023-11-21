import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { userURL } from '../../Base/Constent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getFeedbackInfo,
  selectEmail,
  selectFeedback,
  selectPhone,
  selectTasks,
  setEmail,
  setFeedback,
  setPhone,
} from '../../ReduxToolKit/User/FeedBackSlice';
import { useDispatch, useSelector } from 'react-redux';

function Feedback() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const email = useSelector(selectEmail);
  const phone = useSelector(selectPhone);
  const feedback = useSelector(selectFeedback);

  useEffect(() => {
    dispatch(getFeedbackInfo());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    try {
      await axios.post(`${userURL}/form/feedback`, { email, phone, feedback });
      // console.log('Form submitted successfully');
  
      // Show success toast
      toast.success('Form submitted successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      // Wait for the async call to complete before clearing the fields
      await dispatch(getFeedbackInfo());
  
      dispatch(setEmail(''));
      dispatch(setPhone(''));
      dispatch(setFeedback(''));
    } catch (error) {
      console.error('Error submitting form:', error);
  
      // Show error toast
      toast.error('Error submitting form', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  

  return (
    <div className="min-w-full p-5">
      <ToastContainer position="top-right"
       autoClose={3000}
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover />

    <form onSubmit={handleSubmit}>
    <div className="my-10 flex gap-5">
        <input
          type="email"
          placeholder="email"
          className="email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />

        <input
          type="number"
          placeholder="contact number"
          className="email"
          value={phone}
          onChange={(e) => dispatch(setPhone(e.target.value))}
        />
      </div>
      <div className="my-10 flex gap-5">
        <textarea
          placeholder="Text us your valuable words"
          rows="9"
          onChange={(e) => dispatch(setFeedback(e.target.value))}
          value={feedback}
          className="p-2"
        />
      </div>
      <div className="flex justify-center">
        <button type='submit'  className="btn w-[200px] font-bold my-3">
          Submit
        </button>
      </div>
    </form>
    </div>
  );
}

export default Feedback;
