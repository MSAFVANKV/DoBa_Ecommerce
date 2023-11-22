// EnquiryForm.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormEnquiry, getEnquiryForm } from '../../ReduxToolKit/User/EnquirySlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { EnquiryFormSchema } from '../../ValidationSchema/SignUpSchema';
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
    businessType: '',
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
  //   const validateForm = () => {
  //     if (
  //       formState.contactNumber &&
  //       formState.email &&
  //       formState.fullName &&
  //       formState.commends &&
  //       formState.businessType
  //     ) {
  //       setError('');
  //       return true;
  //     } else {
  //       let errorFields = [];
  //       for (const [key, value] of Object.entries(formState)) {
  //         if (!value) {
  //           errorFields.push(key);
  //         }
  //       }
  //       setError(errorFields.join(', '));
  //       return false;
  //     }
  //   };

  //  // ... (previous code)

  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       if(!validateForm()){
  //         return
  //       }

  //         await dispatch(FormEnquiry({ formState }));
  //         // console.log('Form submitted successfully');
  //            // Show success toast
  //       toast.success('Form submitted successfully,\n We will get you soon', {
  //         position: 'top-right',
  //         autoClose: 4000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //         dispatch(getEnquiryForm());
  //         setFormState({
  //             contactNumber: '',
  //             email: '',
  //             fullName: '',
  //             businessType: '',
  //             commends: '',
  //         });
  //         console.log('Form state reset');
  //     } catch (error) {
  //         console.error('form adding error:', error);
  //     }
  // };


  // ... (remaining code)

  const formik = useFormik({
    initialValues: {
      contactNumber: '',
      email: '',
      fullName: '',
      businessType: '',
      productType: "BOTH",
      commends: '',
    },
    validationSchema: EnquiryFormSchema,
    onSubmit: (values) => {
      dispatch(FormEnquiry({ formState: values })).then((res) => {
        // Handle success or error
        toast.success('Form submitted successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        formik.resetForm();
      }).catch((error) => {
        console.error('form adding error:', error);
      });
    },
  });

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

      <form onSubmit={formik.handleSubmit} className='min-w-full p-5'>

        <div className="sm:my-10 sm:flex gap-5">
          <div className="w-full">
            <input
              type="email"
              name='email'
              placeholder="Email"
              className="email  sm:mb-0 mb-10"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

            />
            {formik.touched.email && formik.errors.email && (
              <div className=' m-auto   rounded-lg text-[#ca4747] font-bold'>
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="w-full">
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Contact Number"
              name='contactNumber'
              className='email'
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit number"
              minLength="10"
              maxLength="10"
              required
            />
            {formik.touched.contactNumber && formik.errors.contactNumber && (
              <div className=' m-auto -bottom-11  rounded-lg text-[#ca4747] font-bold'>
                {formik.errors.contactNumber}
              </div>
            )}
          </div>
        </div>
        {/*  */}
        <div className="my-10">
          <input type="text"
            name='fullName'
            placeholder='Full Name'
            className=''
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullName && formik.errors.fullName && (
          <div className=' m-auto -bottom-11  rounded-lg text-[#ca4747] font-bold'>
            {formik.errors.fullName}
          </div>
        )}
        </div>
        {/*  */}
        <div className="my-10 sm:flex gap-5">
          <div className="w-full">
          <input
            type="text"
            name='businessType'
            placeholder="Business Type"
            className='sm:mb-0 mb-10'
            value={formik.values.businessType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           {formik.touched.businessType && formik.errors.businessType && (
          <div className=' text-[#ca4747] font-bold'>
            {formik.errors.businessType}
          </div>
        )}
          </div>
          <select
            placeholder="Products"
            name='productType'
            value={formik.values.productType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            value={formik.values.commends}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='p-2'
          />
          {formik.touched.commends && formik.errors.commends && (
          <span className=' text-[#ca4747] font-bold'>
            {formik.errors.commends}
          </span>
        )}
        </div>
        {/* {error && (
          <div className='p-5 bg-red-200 m-auto my-2 rounded-lg text-[#ca4747] font-bold'>
            {`include the field: ${error}`}
          </div>
        )} */}
        <div className='flex justify-center'>
          <button type='submit' className='btn w-[100px]' disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Loading...' : 'SUBMIT'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default EnquiryForm;
