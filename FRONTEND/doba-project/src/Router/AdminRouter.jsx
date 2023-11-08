import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Dashboard from '../Pages/AdminSide/Dashboard'
import AdminLogin from '../Pages/AdminSide/AdminLogin'
import SpecialDay from '../Pages/AdminSide/SpecialDay'
import { adminbaseURL } from '../Base/Constent'
import SignUp from '../Pages/AdminSide/SignUp'
import Products from '../Pages/AdminSide/Products'
import AdminHeader from '../Components/AdminHeader/AdminHeader'
import { useDispatch } from 'react-redux'
import Footer from '../Components/Footer/Footer'
import Slider from '../Pages/AdminSide/Slider'

function AdminRouter() {
  const dispatch = useDispatch()

    const [isAdminLogin, setIsAdminLoggedIn] =useState(false);

    const handleAdminSignup = () => {
        setIsAdminLoggedIn(true);
        
    };

    const handleAdminLoginSuccess = () => {
        setIsAdminLoggedIn(true);
    };

    useEffect(() => {
            axios.get(`${adminbaseURL}/check-auth`, { withCredentials:true })
            .then(res => {
                if (res.data.isAuthenticated) {
                    setIsAdminLoggedIn(true)
                }
            })
    },[])

    
  const handleLogout = async () => {
    try {
        await axios.get(`${adminbaseURL}/logout`, { withCredentials: true });
        dispatch(setIsAdminLoggedIn(false))
    } catch (error) {
        console.error("Error during logout:", error);
    }
};

  return (
    <div> 
      { isAdminLogin && <AdminHeader onLogout={handleLogout}/>}

    <Routes>
        <Route path='/admin' element={isAdminLogin ?<Navigate to="/admin/dashboard" /> : <AdminLogin onAdminLoginSuccess={handleAdminLoginSuccess}/>} />
        <Route path="/admin/signup" element={<SignUp adminSignup={handleAdminSignup} />} />
        <Route path='/admin/dashboard'element={ isAdminLogin ?<Dashboard setIsAdminLoggedIn={setIsAdminLoggedIn}/> : <Navigate to={'/admin'}/>} />
        <Route path='/admin/specialday' element={isAdminLogin ?<SpecialDay/>: <Navigate to={'/admin'}/>} />
        <Route path='/admin/products' element={isAdminLogin ?<Products/>: <Navigate to={'/admin'}/>} />
        <Route path='/admin/slider' element={isAdminLogin ?<Slider/>: <Navigate to={'/admin'}/>} />


    </Routes>

    { isAdminLogin && <Footer onLogout={handleLogout}/>}
    </div>
  )
}

export default AdminRouter