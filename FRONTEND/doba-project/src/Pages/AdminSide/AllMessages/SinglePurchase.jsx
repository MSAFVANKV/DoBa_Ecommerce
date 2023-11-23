// SinglePurchase.jsx

import React from 'react';
import { IoIosCall } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";

function SinglePurchase({ selectedItem, selectedEnquiryItem, openSingeForm, enquiyForm }) {
  return (
    <div className='w-[100%] h-[100vh] bg-white rounded-2xl font-normal'>
      {selectedItem ? (
        <>
        <IoIosArrowRoundBack className='m-5 w-[30px] h-[30px] cursor-pointer hover:bg-slate-100 rounded-full' onClick={openSingeForm}/>
          <h2 className='ps-5 font-bold'>Message From: <a href={`mailto:${selectedItem.email}`} className='text-blue-700 font-normal'>{selectedItem.email}</a></h2>
          <h2 className='ps-5 font-bold ' >Contact Number:<a href={`tel:${selectedItem.number}`} className='text-blue-700 font-normal'>{selectedItem.number}</a></h2>
          <hr />
         <div className='p-5 font-bold leading-10'>
         <p className='text-gray-500'>Full Name: <span className=' font-normal text-black'>{selectedItem.fullName}</span></p>
         <p className='text-gray-500  mb-5'>User Intrested On: <span className='  font-normal text-black'>{selectedItem.productName}</span></p>
          <p className='text-gray-500'>Commend: <span className='  font-normal text-black'>{selectedItem.command}</span></p>
         </div>
          {/* Add more details as needed */}
        </>
      ) : selectedEnquiryItem ?
       <div className="">
        <IoIosArrowRoundBack className='m-5 w-[30px] h-[30px] cursor-pointer hover:bg-slate-100 rounded-full' onClick={enquiyForm}/>
        <h2 className='ps-5 font-bold'>Message From: <span className='text-blue-800 font-normal'>{selectedEnquiryItem.email}</span></h2>
        <h2 className='font-normal ps-5 flex items-center' >Contact Number:<a href={`tel:${selectedEnquiryItem.contactNumber}`} className='text-blue-700 font-normal flex items-center ms-2'><IoIosCall />{selectedEnquiryItem.contactNumber}</a></h2>

    <span className=' font-normal ps-5 flex items-center'></span>  
          <hr />
         <div className='p-5 font-bold leading-10'>
         <p className='text-gray-500'>Name: <span className=' font-normal text-black'>{selectedEnquiryItem.fullName}</span></p>
         <p className='text-gray-500'>Business Type: <span className=' font-normal text-black'>{selectedEnquiryItem.businessType}</span></p>
         <p className='text-gray-500  mb-5'>User Intrested On: <span className='  font-normal text-black'>{selectedEnquiryItem.productType}</span></p>
         <p className='text-gray-500'>Comments: <span className='  font-normal text-black'>{selectedEnquiryItem.commends}</span></p>
         </div>
       </div> 
       : (
        <p>No item selected</p>
      )}
    </div>
  );
}

export default SinglePurchase;
