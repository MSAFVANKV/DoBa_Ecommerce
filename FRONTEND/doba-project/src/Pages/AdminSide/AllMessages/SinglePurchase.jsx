// SinglePurchase.jsx

import React from 'react';

function SinglePurchase({ selectedItem }) {
  return (
    <div className='w-[100%] bg-white rounded-2xl'>
      {selectedItem ? (
        <>
          <h2>Selected Item Details</h2>
          <p>Full Name: {selectedItem.fullName}</p>
          <p>Command: {selectedItem.command}</p>
          {/* Add more details as needed */}
        </>
      ) : (
        <p>No item selected</p>
      )}
    </div>
  );
}

export default SinglePurchase;
