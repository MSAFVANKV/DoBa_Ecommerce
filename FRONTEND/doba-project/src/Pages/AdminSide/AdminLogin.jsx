import React, { useState } from 'react'
import '../../Components/Header/Header.css'
import { useDispatch, useSelector } from 'react-redux'
import { login, loginAdmin } from '../../ReduxToolKit/Admin/AdminLoginSlice'

function AdminLogin({ onAdminLoginSuccess }) {
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [logError, setLogError] = useState("")
    
    const hanleSubmit = async (e) => {
        e.preventDefault();

       await dispatch(loginAdmin({ email, password })) // Pass the email and password as an object
            .then((res) => {
                // console.log(res, 'API response');
                // console.log(res.payload,"console.log(res.payload);");

                if (res.payload) {
                    dispatch(onAdminLoginSuccess());
                    setEmail("");
                    setPassword("");
                }  else if (res.error && res.error.message) {
                    setLogError(res.error.message);
                  } else{
                        setLogError("something went wrong!!")
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
            });
    }

    return (
        <div className='modal-container'>
            <div>
                <form onSubmit={(e)=>{hanleSubmit(e)}} className="bg-white w-[350px] h-[300px] rounded-lg flex-col pt-10 flex items-center gap-4">
                <span className='font-bold'>ADMIN LOGIN</span>
                    <input type="email"
                        className='border border-black w-[80%] p-2 rounded-xl bg-slate-100'
                        value={email}
                        placeholder='email'
                        onChange={(e) => {setEmail(e.target.value); setLogError("")}}
                    />
                    <input type="password"
                        className='border border-black w-[80%] p-2 rounded-xl bg-slate-100'
                        value={password}
                        placeholder='password'
                        onChange={(e) => {setPassword(e.target.value); setLogError("")}}
                    />
                    <button type='submit' className='border bg-[#F26D1E] p-3 rounded-xl shadow-lg text-white font-bold hover:bg-[#f18e54]'>SUBMIT</button>
                    {logError && <p className='text-red-600 font-bold transition-all transition[1s ease-out]'>{logError}</p>}
                </form>
            </div>
        </div>
    )
}

export default AdminLogin