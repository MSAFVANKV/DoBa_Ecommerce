// SinglePurchase.jsx

import React from 'react';

function SinglePurchase({ selectedItem }) {
  return (
    <div className='w-[100%] h-[100vh] bg-white rounded-2xl font-normal'>
      {selectedItem ? (
        <>
          <h2 className='p-5 font-bold'>Message From: <span className='text-blue-800 font-normal'>{selectedItem.email}</span></h2>
          <hr />
         <div className='p-5 font-bold'>
         <p>Full Name: <span className=' font-normal'>{selectedItem.fullName}</span></p>
          <p>Commend: <span className='  font-normal'>{selectedItem.command}</span></p>
         </div>
          {/* Add more details as needed */}
        </>
      ) : (
        <p>No item selected</p>
      )}
    </div>
  );
}

export default SinglePurchase;
