import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function SideBar({ items, index, Icon, closeToggle }) {
    // const [sideBar, setSideBar] = useState("#sidebar.active")
  return (
    <div className='modal-container ' onClick={()=>closeToggle()}>
      <div id='' className=' border rounded-lg p-[2rem] bg-white w-[80%] sm:w-[28em] '>
        <ul className='text-black font-bold flex flex-col space-y-5 text-[1.2rem]'>
          {items.map((item, index) => (
            <li className='flex items-center justify-center hover:underline underline-offset-4' key={index}>
              <NavLink
                className={({ isActive }) => {
                  // isActive is accessible within this scope
                  const iconColor = isActive ? 'text-[#F26D1E]' : 'text-black';
                  return ` ${iconColor} hover:text-black`;
                }}
                to={item.path}
              >
                <div className="flex items-center">
                  {Icon && (
                    <Icon
                      className={({ isActive }) => (isActive ? 'text-[#F26D1E]' : 'text-black')}
                    />
                  )}
                  {item.display}
                </div>
              </NavLink>
            </li>
          ))}
          {/* <div className="flex justify-center">
          <button className='btn w-[50%] mb-5'>LOGIN</button>

          </div> */}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
