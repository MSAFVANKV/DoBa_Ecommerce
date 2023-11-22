import React from 'react';
import { useDispatch } from 'react-redux';
import { singleFormEnquiry } from '../../ReduxToolKit/User/SingleFormSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { UserFormSchema } from '../../ValidationSchema/SignUpSchema';

function UserForm({ product }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      number: '',
      email: '',
      fullName: '',
      productName: product.productName,
      commends: '',
    },
    validationSchema: UserFormSchema,
    onSubmit: (values) => {
      dispatch(singleFormEnquiry({ formState: values })).then((res) => {
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
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <form onSubmit={formik.handleSubmit} className='sm:w-[500px sm:h-[500px] sm:border p-5 rounded-3xl '>
        <span className='text-[1.3rem] font-bold'>Approach us for this Item</span>
        <div className='sm:flex sm:my-0 my-5 gap-2'>
          <div className="">
          <input
            type='email'
            placeholder='email here'
            name='email'
            className='w-[100%] p-3 border rounded-md shadow-sm my-3'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           {formik.touched.email && formik.errors.email && (
          <div className=' m-auto  rounded-lg text-[#ca4747] font-bold'>
            {formik.errors.email}
          </div>
        )}
          </div>
          
         <div className="">
         <input
            type='number'
            placeholder='Phone Number'
            name='number'
            className='w-[100%] p-3 border rounded-md shadow-sm my-3'
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
               
         {formik.touched.number && formik.errors.number && (
          <div className=' m-auto  rounded-lg text-[#ca4747] font-bold'>
            {formik.errors.number}
          </div>
        )}
         </div>
        </div>
  
        <div className='flex flex-col my-5'>
          <input
            type='text'
            placeholder='Full Name'
            name='fullName'
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           {formik.touched.fullName && formik.errors.fullName && (
          <div className=' m-auto  rounded-lg text-[#ca4747] font-bold'>
            {formik.errors.fullName}
          </div>
        )}
        </div>
        <div className='flex flex-col my-5'>
          <input
            type='text'
            readOnly
            name='productName'
            value={formik.values.productName}
            onChange={formik.handleChange}
          />
        </div>
        <div className='flex flex-col my-5'>
          <textarea
            name='commends'
            placeholder='How can we help you'
            value={formik.values.commends}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='p-2'
          />
        </div>
        
        {formik.touched.commends && formik.errors.commends && (
          <div className=' m-auto  rounded-lg text-[#ca4747] font-bold'>
            {formik.errors.commends}
          </div>
        )}
        <div className='flex justify-center'>
          <button type='submit' className='btn w-[100px]' disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Loading...' : 'SUBMIT'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;

