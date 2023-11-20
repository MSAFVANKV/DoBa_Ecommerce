// SinglePurchase.jsx

import React from 'react';
import { IoIosCall } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";

function SinglePurchase({ selectedItem, selectedEnquiryItem, openSingeForm, enquiyForm }) {
  return (
    <div className='w-[100%] h-[100vh] bg-white rounded-2xl font-normal'>
      {selectedItem ? (
        <>
        <IoIosArrowRoundBack className='m-5' onClick={openSingeForm}/>
          <h2 className='p-5 font-bold'>Message From: <span className='text-blue-800 font-normal'>{selectedItem.email}</span></h2>
          <hr />
         <div className='p-5 font-bold'>
         <p>Full Name: <span className=' font-normal'>{selectedItem.fullName}</span></p>
          <p>Commend: <span className='  font-normal'>{selectedItem.command}</span></p>
         </div>
          {/* Add more details as needed */}
        </>
      ) : selectedEnquiryItem ?
       <div className="">
        <IoIosArrowRoundBack className='m-5' onClick={enquiyForm}/>
        <h2 className='ps-5 font-bold'>Message From: <span className='text-blue-800 font-normal'>{selectedEnquiryItem.email}</span></h2>
    <span className=' font-normal ps-5 flex items-center'><IoIosCall />{selectedEnquiryItem.contactNumber}</span>  
          <hr />
         <div className='p-5 font-bold'>
         <p className='text-gray-500'>Name: <span className=' font-normal text-black'>{selectedEnquiryItem.fullName}</span></p>
         <p className='text-gray-500 mb-5'>Business Type: <span className=' font-normal text-black'>{selectedEnquiryItem.businessType}</span></p>
         <span className='  font-normal m-9'>{selectedEnquiryItem.commends}</span>
         </div>
       </div> 
       : (
        <p>No item selected</p>
      )}
    </div>
  );
}

export default SinglePurchase;
