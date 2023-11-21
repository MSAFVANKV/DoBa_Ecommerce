import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { singleFormEnquiry } from '../../ReduxToolKit/User/SingleFormSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserForm({ product }) {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    number: '',
    email: '',
    fullName: '',
    productName: product.productName,
    commends: '',
  });
  const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormState({
//       ...formState,
//       [e.target.name]: e.target.value,
//     });
//   };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const validateForm = () => {
    if (
      formState.number &&
      formState.email &&
      formState.fullName &&
      formState.commends
    ) {
      setError('');
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setError(errorFields.join(', '));
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(singleFormEnquiry({ formState })).then((res) => {
      // Handle success or error
      toast.success('Form submitted successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setFormState({
        number: '',
        email: '',
        fullName: '',
        productName: product.productName,
        commends: '',
      });
    }).catch((error) => {
      console.error('form adding error:', error);
    });
  };

  return (
    <div>
       <ToastContainer position="top-right"
       autoClose={3000}
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover />

      <form onSubmit={handleSubmit} className='sm:w-[500px sm:h-[500px] sm:border p-5 rounded-3xl '>
        <span className='text-[1.3rem]  font-bold'>Approach us for this Item</span>
        <div className='sm:flex sm:my-0 my-5 gap-2'>
          <input
            type='email'
            placeholder='email here'
            name='email'
            className='w-[100%] p-3  border rounded-md shadow-sm my-3'
            value={formState.email}
            onChange={handleChange}
          />
          <input
            type='number' 
            placeholder='Phone Number'
            name='number'
            className='w-[100%] p-3  border rounded-md shadow-sm my-3'
            value={formState.number}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col my-5'>
          <input
            type='text'
            placeholder='Full Name'
            name='fullName'
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col my-5'>
          <input
            type='text'
            readOnly
            name='productName'
            value={formState.productName}
            onChange={handleChange}

          />
        </div>
        <div className='flex flex-col my-5'>
          <textarea
            name='commends'
            placeholder='How can we help you'
            value={formState.commends}
            onChange={handleChange}
            className='p-2'
          />
        </div>
        {error && (
          <div className='p-5 bg-red-200 m-auto my-2 rounded-lg text-[#ca4747] font-bold'>
            {`include the field: ${error}`}
          </div>
        )}
        <div className='flex justify-center'>
          <button
            type='submit'
            // onClick={handleSubmit}
            className='btn w-[100px]'>
            { singleFormEnquiry.pending ? " SUBMIT " : "Loading.."}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
