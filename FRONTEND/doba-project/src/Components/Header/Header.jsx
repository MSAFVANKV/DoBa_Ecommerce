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
  {
    id: 4,
    path: '/contact',
    display: 'CONTACT',
  }
];

function Header() {
  const [toggle, setToggle] = useState(false);
  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <header className='bg-white sm:h-[90px] h-[70px] sticky_header shadow-md'>
        <div className='flex justify-between items-center'>
          {/* logo start==================== */}
          <div className='sm:w-[90px] w-[70px] p-1 sm:ms-9 m-1'>
           <a href="/"> <img src={logo} alt='' /></a>
          </div>
          {/* log end==================== */}
          {/* Menu sart================== */}
          <div className='hidden sm:flex'>
            <ul className='flex gap-5 items-center'>
              {navLinks.map((items, index) => (
                <HeaderItems items={items} Icon={items.icon} index={index} key={index}/>
              ))}
            </ul>
          </div>
          <div className=''>
            {/* <button className='btn hidden sm:flex'>LOGIN</button> */}
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
