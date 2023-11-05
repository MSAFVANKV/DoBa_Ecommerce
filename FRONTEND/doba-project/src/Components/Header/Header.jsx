import React, { useState } from 'react';
import './Header.css';
import { NavLink, Link } from 'react-router-dom';

// imported images
import logo from '../images/doba_logo.png';

// imported icons
import { AiFillHome } from 'react-icons/ai';
import HeaderItems from './HeaderItems';
import SideBar from './SideBar';

const navLinks = [
  {
    id: 1,
    path: '/home',
    display: 'HOME',
    icon: AiFillHome,
  },
  {
    id: 2,
    path: '/products',
    display: 'PRODUCTS',
  },
  {
    id: 3,
    path: '/aboutus',
    display: 'ABOUT US',
  },
];

function Header() {
  const [toggle, setToggle] = useState(false);
  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <header className='bg-white h-[100px] sticky_header'>
        <div className='flex justify-between items-center'>
          {/* log start==================== */}
          <div className='logo p-1 ms-9'>
            <img src={logo} alt='' />
          </div>
          {/* log end==================== */}
          {/* Menu sart================== */}
          <div className='hidden sm:flex'>
            <ul className='flex gap-5 items-center'>
              {navLinks.map((items, index) => (
                <HeaderItems items={items} Icon={items.icon} index={index} />
              ))}
            </ul>
          </div>
          <div className=''>
            <button className='btn hidden sm:flex'>LOGIN</button>
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
    </>
  );
}

export default Header;
