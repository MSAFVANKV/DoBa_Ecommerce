import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import '../../Components/Header/Header.css';
import { forgotPass } from '../../ReduxToolKit/Admin/AdminLoginSlice';
import { useNavigate } from 'react-router-dom';
import { adminbaseURL } from '../../Base/Constent';
import axios from 'axios';


const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
});


function ForgetPass() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const adminError = useSelector((state) => state.admin?.error);
    const [email, setEmail] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${adminbaseURL}/forgot-password`, { email: values.email });
                console.log(response.data, 'Password reset instructions sent successfully.');

                if (response.data.Status === "Success token") {
                    navigate('/admin/dashboard');
                }
            } catch (error) {
                console.error('Error resetting password:', error);
            }
        },
    });

    return (
        <div className="modal-container">
            <div>
                <form onSubmit={formik.handleSubmit} className="bg-white w-[350px] py-2 rounded-lg flex-col pt-10 flex items-center gap-4">
                    <span className="font-bold">ADMIN Reset Password</span>

                    <input
                        type="email"
                        className={`border w-[80%] p-2 rounded-xl bg-slate-100 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-black'}`}
                        name="email"
                        placeholder="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}

                    <button type="submit" className="border bg-[#F26D1E] p-2 w-[80%] my-5 rounded-xl shadow-lg text-white font-bold hover:bg-[#f18e54]">
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgetPass;

