import React from 'react'

function ModalProducts({closeModal}) {
  return (
    <div className='modal-container' onClick={(e) =>{if( e.target.className === 'modal-container') closeModal()}}>
       <div className="w-[40rem] h-[500px] bg-white">
        <input type="text" className='border'/>
        <button type='submit'>submi</button>
       </div>
    </div>
  )
}

export default ModalProducts