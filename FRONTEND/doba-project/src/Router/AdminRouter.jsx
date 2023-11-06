import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Dashboard from '../Pages/AdminSide/Dashboard'
import AdminLogin from '../Pages/AdminSide/AdminLogin'
import SpecialDay from '../Pages/AdminSide/SpecialDay'
import { adminbaseURL } from '../Base/Constent'
import SignUp from '../Pages/AdminSide/SignUp'

function AdminRouter() {
    const navigate = useNavigate();
    const [isAdminLogin, setIsAdminLoggedIn] =useState(false);

    const handleAdminSignup = () => {
        setIsAdminLoggedIn(true);
        
    };

    const handleAdminLoginSuccess = () => {
        setIsAdminLoggedIn(true);
        // navigate('/admin/dashboard');
    };

    useEffect(() => {
            axios.get(`${adminbaseURL}/check-auth`, { withCredentials:true })
            .then(res => {
                if (res.data.isAuthenticated) {
                    setIsAdminLoggedIn(true)
                }
            })
    },[])

  return (
    <div> 
    <Routes>
        <Route path='/admin' element={isAdminLogin ?<Navigate to="/admin/dashboard" /> : <AdminLogin onAdminLoginSuccess={handleAdminLoginSuccess}/>} />
        <Route path="/admin/signup" element={<SignUp adminSignup={handleAdminSignup} />} />
        <Route path='/admin/dashboard'element={ isAdminLogin ?<Dashboard/> : <Navigate to={'/admin'}/>} />
        <Route path='/admin/specialday' element={isAdminLogin ?<SpecialDay/>: <Navigate to={'/admin'}/>} />
    </Routes>
    </div>
  )
}

export default AdminRouter