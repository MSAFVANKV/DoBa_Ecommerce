import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import ModalProducts from './ModalProducts'
import { adminbaseURL, mainURL } from '../../Base/Constent';
import { getProducts, setProducts } from '../../ReduxToolKit/Admin/ProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {AiFillDelete} from 'react-icons/ai'


function Products() {
  const dispatch = useDispatch()
  const productsList = useSelector(state => state.products?.products);

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);

  // const openProductModal = () => {
  //   setModalOpen(!modalOpen);
  // };
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };
  const closeProductModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };
  const openAddProductModal = () => {
    setSelectedProduct(null); // Reset selectedProduct for adding a new product
    setModalOpen(true);
  };

  useEffect(() => {
    axios.get(`${adminbaseURL}/allproducts`, { withCredentials: true })
      .then((response) => {
        dispatch(setProducts(response.data));
        console.log(response.data);
      })
  }, [dispatch]);
  

  const removeProduct = (id) => {
    axios.delete(`${adminbaseURL}/product/delete/${id}`)
        .then((res) => {
            dispatch(getProducts()); // Fetch updated tasks
        });
}

const columns = [
  {
      name: 'Itm.No',
      selector: (row, index) => index + 1,
      sortable: true,
      wrap: true,
  },
  {
      name: 'Product Image',
      cell: row => (
          <img
              src={`${mainURL}/Public/ProductsImages/${row.file}`}
              alt={row.productName}
              style={{ width: '50px', height: '50px' }}
          />
      ),
      sortable: true,
      wrap: true,
  },
  {
      name: 'Product Name',
      selector: 'productName', // Make sure to use the correct property name
      sortable: true,
      wrap: true,
  },
  {
      name: 'Price',
      selector: 'price', // Make sure to use the correct property name
      sortable: true,
      wrap: true,
  },
  {
      name: 'Category',
      selector: 'category', // Make sure to use the correct property name
      sortable: true,
      wrap: true,
  },
  {
      name: 'Actions',
      ignoreRowClick: true,
      cell: (row) => (
          <>
               <button className='mx-3 border ' onClick={() => openProductModal(row)}>Edit</button>
              <button onClick={() => removeProduct(row._id)}><AiFillDelete/></button>
          </>
      ),
  }
];

  return (
 
  <div className="pt-10 h-[100vh] sm:w-[100%] w-screen bg-[#F6F8FC] p-5">
    <div className=" flex justify-center items-center">
    <button className='bg-[#F26D1E] text-white font-bold p-3 rounded-xl m-5' onClick={openAddProductModal}>ADD PRODUCTS</button>
    </div>
    {modalOpen && <ModalProducts closeModal={closeProductModal} selectedProduct={selectedProduct}/>}
      <div className=" sm:w-[95%]">
      <DataTable
                    title="Add items"
                    columns={columns}
                    // data={productsList || []} 
                    data={productsList} 
                    pagination
                    highlightOnHover
                    customStyles={customStyles}
                    subHeader

                />
      </div>
  </div>

  )
}


const customStyles = {
  headCells: {
      style: {
          backgroundColor: '#e2e8f0',
          fontSize: '19px',
          fontWeight: 'bold',
      },
  },
  cells: {
      style: {
          padding: '10px',
          fontSize: '12px',
          fontWeight: 'bold',
      },
  },
};

export default Products