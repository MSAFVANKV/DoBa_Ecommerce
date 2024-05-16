import React, { useEffect, useState } from 'react';
import './Header.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// imported images
import logo from '../images/doba_logo.png';

// imported icons
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import HeaderItems from './HeaderItems';
import SideBar from './SideBar';
import axios from 'axios';
import { userURL } from '../../Base/Constent';

const navLinks = [
  {
    id: 1,
    path: '/home',
    display: 'HOME',
    icon: AiFillHome,
  },
  // {
  //   id: 2,
  //   path: '/products',
  //   display: 'PRODUCTS',
  // },
  {
      id: 2,
      path: '/careers',
      display: 'CAREERS',
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
  // const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState([]);
  const [sticky,setSticky] = useState(false);
  useEffect(() => {
    const handleScroll =() => {
      const offSet = window.scrollY;
      if (offSet > 0){
        setSticky(true);
      } else{
        setSticky(false);
      }
    }

    window.addEventListener("scroll",handleScroll);

    return () => {
      window.addEventListener("scroll",handleScroll);
    }

  },[])

  const navigate = useNavigate();
  const toggleSidebar = () => {
    setToggle(!toggle);
    
  };
  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };
  
  const handleSearchChange = async (e) => {
    const query = e.target.value;

    if (query === '') {
      setActiveSearch([]);
      return false;
    }

    try {
      const response = await axios.get(`${userURL}/search/products/${query}`);
      setActiveSearch(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };
  // Header.jsx
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (activeSearch && activeSearch.length > 0) {
        navigate('/search/products', { state: { searchResults: activeSearch } });
        setActiveSearch([]); // Clear search results
        e.target.reset();
      }
      else{
        toast.error('Don\'t Find Anything...', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      // Handle error, show a message, etc.
    }
  };
  

  return (
    <>
    {/* bg-white sm:h-[90px] h-[70px] sticky_header shadow-md */}
    
      <header className='bg-white max-w-screen-2xl container mx-auto sticky_header_sidebar top-0 transition-all ease-in-out duration-300 z-50'>
        <div className={`flex justify-between items-center    
      ${sticky ? "transition-all ease-in-out duration-300 bg-base-100 shadow-lg" : ""}
      `}>
          {/* logo start==================== */}
          <div className='sm:max-w-[10%] w-[70px] sm:ms-9 m-1'>
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
            {/* Search input */}
            <div >
            <form onSubmit={handleSearchSubmit} className='sm:flex items-center hidden relative'>
              <input
                type="text"
                name='search'
                id='search'
                placeholder="Search..."
                className='border  border-gray-300 rounded-md p-1 w-full h-full mr-2'
                onChange={(e)=> handleSearchChange(e)}
              />
                  {/* <Link to={`/search/products/${activeSearch}`}> */}
              <button type="submit" className='text-gray-600 absolute right-3 top-1/3'>
                <AiOutlineSearch />
              </button>
              {/* </Link> */}
            </form>
          </div>
        
        </div>
        <ToastContainer position="top-right"
        autoClose={4000}
    
         />
      </header>
      {/* <div className="">
      <div
          id='toggle'
          className={`bgtheme flex sm:hidden ${toggle ? 'active' : ''}`}
          onClick={toggleSidebar}
        ></div>
          
          {toggle && <SideBar items={navLinks} closeToggle={() => setToggle(false)} />}

         
          </div> */}
          {/* <div className={`fixed flex justify-center items-center right-7 top-7 w-[50px] h-[50px] bg-gray-200 z-[999]`}>
                <span className='w-[90px] h[100px] bg-black absolute'>5</span>
          </div> */}
        
    </>
  );
}

export default Header;
