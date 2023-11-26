import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/doba_logo.png';
import { AiOutlineSearch } from 'react-icons/ai';

const navLinks = [
  {
    id: 1,
    path: '/home',
    display: 'HOME',
    // icon: AiFillHome,
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

function SideBar({ items, index, Icon, toggle, closeToggle }) {
    // const [sideBar, setSideBar] = useState("#sidebar.active")
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleImageClick = (path) => {
      navigate(path); // Use navigate to navigate to the specified path
      closeToggle(!toggle)
    };
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleSearchSubmit = (e) => {
      e.preventDefault();
      // Perform search or navigate to search results page
      console.log('Search query:', searchQuery);
      // You can add logic to navigate to the search results page here
    };
  return (
    // <div className='modal-container ' onClick={()=>closeToggle()}>
    //   <div id='' className=' border rounded-lg p-[2rem] bg-white w-[80%] sm:w-[28em] '>
    //     <ul className='text-black font-bold flex flex-col space-y-5 text-[1.2rem]'>
    //       {items.map((item, index) => (
    //         <li className='flex items-center justify-center hover:underline underline-offset-4' key={index}>
    //           <NavLink
    //             className={({ isActive }) => {
    //               // isActive is accessible within this scope
    //               const iconColor = isActive ? 'text-[#F26D1E]' : 'text-black';
    //               return ` ${iconColor} hover:text-black`;
    //             }}
    //             to={item.path}
    //           >
    //             <div className="flex items-center">
    //               {Icon && (
    //                 <Icon
    //                   className={({ isActive }) => (isActive ? 'text-[#F26D1E]' : 'text-black')}
    //                 />
    //               )}
    //               {item.display}
    //             </div>
    //           </NavLink>
    //         </li>
    //       ))}
    //       {/* <div className="flex justify-center">
    //       <button className='btn w-[50%] mb-5'>LOGIN</button>

    //       </div> */}
    //     </ul>
    //   </div>
    // </div>
    <>
     <div className="flex gap-x-4 items-center ">
        <img src={logo} alt='' className={`cursor-pointer w-14 duration-500 rounded-full ${toggle && 'rotate-[360deg]'}`} />
        <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!toggle && 'scale-0'}`}>DoBa </h1>
      </div>
      <ul className='pt-6'>
        {navLinks.map((item, index) => (
          <li key={item.id} className={`flex items-center text-gray-300 gap-x-4
          cursor-pointer p-2 hover:bg-light-white rounded-md ${item.gap ? 'mb-9': 'mb-2'}`}
          onClick={() => handleImageClick(item.path)}>
           
            {/* <img src={item.src} alt={item.display} className="w-6 h-6 mr-2" /> */}
            <NavLink to={item.path} className="text-white" >
              <span className={`${!toggle && 'hidden'} origin-left duration-200`} >{item.display}</span>
            </NavLink>
          </li>
        ))}
           {/* Search input */}
           <div className='flex items-center sm:hidden'>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search..."
                className='border relative border-gray-300 rounded-md p-1 mr-2'
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className='text-gray-600 absolute  -translate-x-7 translate-y-1/2'>
                <AiOutlineSearch />
              </button>
            </form>
          </div>
      </ul></>
  );
}

export default SideBar;
