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
import Messages from '../Pages/AdminSide/Messages'
import AdminSideBar from '../Components/AdminHeader/AdminSideBar'
import '../Styles/adminStyle.css'
import AdminFooter from '../Components/AdminFooter/AdminFooter'

// icons
import { RiMenu2Line } from "react-icons/ri";
import { IoIosArrowForward } from 'react-icons/io'


function AdminRouter() {
  const dispatch = useDispatch()

    const [isAdminLogin, setIsAdminLoggedIn] =useState(false);
    const [isSideBar,setSideBar] = useState(false);
    const [open, setOpen] = useState(false)

    const openSideBar = () => {
      setSideBar(!isSideBar)
    }

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
      <div className="flex ">
      {/* { isAdminLogin && <AdminHeader onLogout={handleLogout}/>} */}
      {/* <div className="sm:block hidden">
      { isAdminLogin && isSideBar && <AdminSideBar onLogout={handleLogout}/>}
      </div> */}
      {/* <div className={`  relative ${isSideBar ?'ps-[220px] transition-all duration-300' : 'ms-0'}`}>
        {isAdminLogin && <button className=' fixed sm:block hidden p-5' onClick={openSideBar}><RiMenu2Line className='text-[1.5rem]'/> </button>} */}
{ isAdminLogin  &&
<div className={` ${open ?'w-72' : 'w-20'} duration-300 h-screen z-50 p-5 pt-8 bg-blue-600 sm:relative fixed`}> 
    <IoIosArrowForward 
        className={`absolute cursor-pointer -right-3 top-9 text-[1.75rem] border rounded-full duration-300 border-blue-600 ${open && 'rotate-180'}`}
        onClick={()=> setOpen(!open)}/>
       <AdminSideBar onLogout={handleLogout} open={open} />

     </div>
}

   <div className="flex-1">
   <Routes>
        <Route path='/admin' element={isAdminLogin ?<Navigate to="/admin/dashboard" /> : <AdminLogin onAdminLoginSuccess={handleAdminLoginSuccess}/>} />
        <Route path="/admin/signup" element={<SignUp adminSignup={handleAdminSignup} />} />
        <Route path='/admin/dashboard'element={ isAdminLogin ?<Dashboard setIsAdminLoggedIn={setIsAdminLoggedIn}/> : <Navigate to={'/admin'}/>} />
        <Route path='/admin/specialday' element={isAdminLogin ?<SpecialDay/>: <Navigate to={'/admin'}/>} />
        <Route path='/admin/products' element={isAdminLogin ?<Products/>: <Navigate to={'/admin'}/>} />
        <Route path='/admin/slider' element={isAdminLogin ?<Slider/>: <Navigate to={'/admin'}/>} />
        <Route path='/admin/messages' element={isAdminLogin ?<Messages/>: <Navigate to={'/admin'}/>} />


    </Routes>

    {/* { isAdminLogin && <AdminFooter onLogout={handleLogout}/>} */}
   </div>
    {/* </div> */}
    </div>
    </div>
  )
}

export default AdminRouter