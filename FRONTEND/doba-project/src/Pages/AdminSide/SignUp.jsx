import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik'
import '../../Components/Header/Header.css'
import { SignupSchema } from '../../ValidationSchema/SignUpSchema';
import { selectAdmin, signupAdmin } from '../../ReduxToolKit/Admin/AdminLoginSlice';


function SignUp({ onSignupSuccess }) {

    const dispatch = useDispatch();
    const adminError = useSelector((state) => state.admin?.error);
    console.log(adminError,"adminError");

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            dispatch(signupAdmin(values))
                .then((res) => {
                    if (res.payload) {
                        dispatch(onSignupSuccess())
                        selectAdmin("")
                    }
                })
        }
    })

    return (
        <div className='modal-container'>
            <div >
                <form action="" onSubmit={formik.handleSubmit} 
                className="bg-white w-[350px] h-[300px] rounded-lg flex-col pt-10 flex items-center gap-4">
                <span className='font-bold'>ADMIN Signup</span>
                {adminError && <div className='text-red-600 font-bold'>{adminError}</div>}

                    <input type="email"
                        className='border border-black w-[80%] p-2 rounded-xl bg-slate-100'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                     {formik.touched.email && formik.errors.email ? 
                        <div className='text-red-600 font-bold'>{formik.errors.email}</div> : null}
                    <input type="password"
                        className='border border-black w-[80%] p-2 rounded-xl bg-slate-100'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? 
                        <div className='text-red-600 font-bold'>{formik.errors.password}</div> : null}
                    <button type='submit' className='border bg-[#F26D1E] p-3 rounded-xl shadow-lg text-white font-bold hover:bg-[#f18e54]'>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp