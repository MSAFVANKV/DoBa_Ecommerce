import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { userURL } from '../../Base/Constent';
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

// //   console.log(tasks, 'tasks=====')
//   console.log(selectEmail,setEmail, 'selectEmail,setEmail=====')
//   console.log(selectPhone,setPhone, 'selectPhone,setPhone=====')
//   console.log(selectFeedback,setFeedback, 'selectFeedback,setFeedback=====')


useEffect(() => {
    dispatch(getFeedbackInfo());
}, [dispatch]);

const handleSubmit = async (e) => {
    // e.preventDefault();
  
    try {
      await axios.post(`${userURL}/form/feedback`, { email, phone, feedback });
      console.log('Form submitted successfully');
  
      // Wait for the async call to complete before clearing the fields
      dispatch(getFeedbackInfo());
  
      dispatch(setEmail(''));
      dispatch(setPhone(''));
      dispatch(setFeedback(''));
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
//   const handleSubmit = async (e) => {
    // e.preventDefault();
  
//     axios.post(`${userURL}/form/feedback`, { email, phone, feedback }).then((res) => {
//         console.log(res.data);
//         dispatch(setEmail(""));
//         dispatch(setPhone(""));
//         dispatch(setFeedback(""));
    
//         dispatch(getFeedbackInfo()); // Fetch updated tasks
//     })
    
//   };

  return (
    <div className="min-w-full p-5">
      <div className="my-10 flex gap-5">
        <input
          type="email" 
          placeholder='email'
          className='email'
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />

        <input
          type="number"
          
          placeholder='contact number'
          className='email'
          value={phone}
          onChange={(e) => dispatch(setPhone(e.target.value))}
        />
      </div>
      <div className="my-10 flex gap-5">
        <textarea
          
          placeholder='Text us your valuable words'
          rows='9'
          onChange={(e) => dispatch(setFeedback(e.target.value))}
          value={feedback}
          className='p-2'
        />
      </div>
      <div className="flex justify-center">
        <button  onClick={handleSubmit} className='btn w-[200px] font-bold my-3'>Submit</button>
      </div>
    </div>
  );
}

export default Feedback;
