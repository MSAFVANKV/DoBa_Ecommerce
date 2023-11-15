import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { singleFormEnquiry } from '../../ReduxToolKit/User/SingleFormSlice';

function UserForm({ product }) {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    number: '',
    email: '',
    fullName: '',
    productName: product.productName,
    command: '',
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
      formState.command
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
      setFormState({
        number: '',
        email: '',
        fullName: '',
        productName: product.productName,
        command: '',
      });
    }).catch((error) => {
      console.error('form adding error:', error);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='w-[500px] h-[500px] border p-5 rounded-3xl '>
        <span className='text-[1.3rem]  font-bold'>Approach us for this Item</span>
        <div className='flex my-5 gap-2'>
          <input
            type='email'
            placeholder='email here'
            name='email'
            value={formState.email}
            onChange={handleChange}
          />
          <input
            type='number' 
            placeholder='Phone Number'
            name='number'
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
            name='command'
            value={formState.command}
            onChange={handleChange}
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
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
