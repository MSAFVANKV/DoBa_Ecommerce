import React, { useState } from 'react'
import '../Header/Header.css';
import { NavLink, Link } from 'react-router-dom';

// imported images
import logo from '../images/doba_logo.png';
import { AiFillHome } from 'react-icons/ai';
import HeaderItems from '../Header/HeaderItems';
import SideBar from '../Header/SideBar';
import { adminbaseURL } from '../../Base/Constent';
import { logoutAdmin } from '../../ReduxToolKit/Admin/AdminLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import AdHeaderItem from './AdHeaderItem';

const navLinks = [
  {
    id: 1,
    path: '/admin/dashboard',
    display: 'DASHBOARD',
    icon: AiFillHome,
  },
  {
    id: 2,
    path: '/admin/products',
    display: 'PRODUCTS',
  },
  {
    id: 3,
    path: '/admin/specialday',
    display: 'BANNER',
  },
  {
    id: 4,
    path: '/admin/slider',
    display: 'SLIDER',
  },
  {
    id: 4,
    path: '/admin/messages',
    display: 'MESSAGES',
  },
];

function AdminSideBar({onLogout}) {
    const dispatch = useDispatch();
    const [logoutError, setLogoutError] = useState(null);
    const [toggle, setToggle] = useState(false);
    const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  
  
    const toggleSidebar = () => {
      setToggle(!toggle);
    };
  return (
    <div className='w-[220px] left-0 h-[100%] bg-white fixed  z-50 m-0'>
        {/* j */}
        <header className='p-5'>
        <div className='flex flex-col'>
          {/* logo start==================== */}
          <div className='logo p-1 ms-9'>
            <img src={logo} alt='' />
          </div>
          {/* log end==================== */}
          {/* Menu sart================== */}
          <div className='flex flex-col'>
            <ul className='flex flex-col items-start p-5 gap-3'>
              {navLinks.map((items, index) => (
                <AdHeaderItem items={items} Icon={items.icon} index={index} />
              ))}
           <button className=" hidden sm:flex" onClick={onLogout}>LOGOUT</button>

            </ul>
          </div>
          <div className=''>

            {/* {logoutError && <p className="error">{logoutError}</p>} */}
          </div>
        
        </div>
      </header>
      <div className="">
      <div
          id='toggle'
          className={`bgtheme flex sm:hidden ${toggle ? 'active' : ''}`}
          onClick={toggleSidebar}
        ></div>
          
          {toggle && <SideBar items={navLinks} closeToggle={() => setToggle(false)} />}

         
          </div>
    </div>
  )
}

export default AdminSideBar