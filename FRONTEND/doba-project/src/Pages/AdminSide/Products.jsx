import React, { useState } from 'react'
import ModalProducts from './ModalProducts'

function Products() {
  const [modalOpen, setModalOpen] = useState(false)
  const openProductModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div className='container bg-slate-400 mx-auto'>
    <div className='page-container justify-center'>
        <div className="">
        <button className='bg-[#F26D1E] text-white font-bold p-3 rounded-xl m-5' onClick={openProductModal}>ADD</button>
        </div>
         {modalOpen && <ModalProducts closeModal={() => setModalOpen(false)} />}
    </div>
  </div>
  )
}

export default Products