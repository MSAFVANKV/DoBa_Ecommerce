// EnquiryForm.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormEnquiry, getEnquiryForm } from '../../ReduxToolKit/User/EnquirySlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EnquiryForm() {
  const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [businessType, setBusinessType] = useState('');
//   const [productType, setproductType] = useState('');
//   const [commends, setCommends] = useState('');
//   const [fullName, setFullName] = useState('');
const [formState, setFormState] = useState({
    contactNumber: '',
    email: '',
    fullName: '',
    businessType:'',
    productType: "BOTH",
    commends: '',
  });
  const [error, setError] = useState('');

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const validateForm = () => {
    if (
      formState.contactNumber &&
      formState.email &&
      formState.fullName &&
      formState.commends &&
      formState.businessType
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

 // ... (previous code)

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(!validateForm()){
        return
      }
      
        await dispatch(FormEnquiry({ formState }));
        // console.log('Form submitted successfully');
           // Show success toast
      toast.success('Form submitted successfully,\n We will get you soon', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
        dispatch(getEnquiryForm());
        setFormState({
            contactNumber: '',
            email: '',
            fullName: '',
            businessType: '',
            commends: '',
        });
        console.log('Form state reset');
    } catch (error) {
        console.error('form adding error:', error);
    }
};

  
  // ... (remaining code)
  

  return (
    <div className="">
       <ToastContainer position="top-right"
       autoClose={3000}
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover />

    <form onSubmit={handleSubmit} className='min-w-full p-5'>

        <div className="sm:my-10 sm:flex gap-5">
          <input
            type="email"
            name='email'
            placeholder="Email"
            className="email  sm:mb-0 mb-10"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Contact Number"
            name='contactNumber'
            className='email'
            value={formState.contactNumber}
            onChange={handleChange}
          />
        </div>
              {/*  */}
              <div className="my-10">
                <input type="text"
                name='fullName'
                placeholder='Full Name'
                className='' 
                value={formState.fullName}
                onChange={handleChange}
                />
            </div>
        {/*  */}
        <div className="my-10 sm:flex gap-5">
          <input
            type="text"
            name='businessType'
            placeholder="Business Type"
            className='sm:mb-0 mb-10'
            value={formState.businessType}
            onChange={handleChange}
          />
          <select
            placeholder="Products"
            name='productType'
            value={formState.productType}
            onChange={handleChange}
            className='email'
          >
            <option value="both">BOTH</option>
            <option value="idly">IDLY</option>
            <option value="dosa">DOSA</option>
          </select>
        </div>
  
        <div className="">
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
        <div className="sm:flex justify-center">
        <button type="submit" className='btn w-[200px] font-bold my-3'>Submit</button>
        </div>
   
    </form>
    </div>
  );
}

export default EnquiryForm;
