import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { getBanner, setBanner } from '../../ReduxToolKit/Admin/bannerSlice';
import { adminbaseURL, mainURL } from '../../Base/Constent';
import axios from 'axios';

import {AiFillDelete, AiFillEdit} from 'react-icons/ai'

function Banner() {
    const dispatch = useDispatch();
    const getBannerSlice = useSelector((state) => state.banner.banner);
    const error = useSelector((state) => state.banner.error);

// console.log(getBannerSlice,'getBannerSlice')

useEffect(() => {
    axios.get(`${adminbaseURL}/allbanner`, { withCredentials: true })
      .then((response) => {
        dispatch(setBanner(response.data));
        console.log(response.data);
      })
  }, [dispatch]);

//   delete
const removeBanner = (id) => {
    axios.delete(`${adminbaseURL}/banner/delete/${id}`)
        .then((res) => {
            dispatch(getBanner()); // Fetch updated tasks
        });
}
    const columns = [
        {
          name: 'Item No',
          selector: (row, index) => index + 1,
          sortable: true,
          wrap: true,
          style: {
            borderLeft: '1px solid #ddd', // Add left border style here
            borderRight: '1px solid #ddd', // Add right border style here
            padding: '8px', // Add padding to the cells
          },
        },
        {
          name: 'Banner Name',
          selector: 'bannerName', // Make sure to use the correct property name
          sortable: true,
          wrap: true,
          style: {
            borderRight: '1px solid #ddd', // Add right border style here
            padding: '8px', // Add padding to the cells
          },
        },
        {
          name: 'Banner Image',
          cell: (row) => (
            <img
              src={`${mainURL}/Public/Banner/${row.file}`}
              alt={row.bannerName}
              style={{ width: '50px', height: '50px' }}
            />
          ),
          sortable: true,
          wrap: true,
          style: {
            borderRight: '1px solid #ddd', // Add right border style here
            padding: '8px', // Add padding to the cells
          },
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            cell: (row) => (
                <>
                    {/* <button onClick={() => handleEdit(row)}>Edit</button> */}
                    <div className="m-auto flex gap-3">
                    <button className='' onClick={() => removeBanner(row._id)}><AiFillDelete /></button>
                    {/* <button onClick={() => removeProduct(row._id)}><AiFillEdit /></button> */}
                    </div>
                </>
            ),
            style: {
                borderRight: '1px solid #ddd', // Add right border style here
                padding: '0px', // Add padding to the cells
              },
        }
      ];
      

  return (
    <div className='sm:w-[90%] w-screen'>
        
        <DataTable
        title="Banner"
        columns={columns}
        data={getBannerSlice}
        pagination
        highlightOnHover
        customStyles={customStyles}
        // subHeader
        />
    </div>
  )
}
const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#e2e8f0',
            fontSize: '20px',
            fontWeight: 'bold',
        },
    },
    cells: {
        style: {
            padding: '16px',
            fontSize: '13px',
            fontWeight: 'bold',
        },
    },
};
export default Banner