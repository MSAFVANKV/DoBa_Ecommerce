import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { getSlider, setslider, uploadSlider } from '../../ReduxToolKit/Admin/SliderSlice';
import { adminbaseURL, mainURL } from '../../Base/Constent';
import axios from 'axios';

// icons
import {AiFillDelete} from 'react-icons/ai'


function Slider() {
    const dispatch = useDispatch()
    const sliderList = useSelector(state => state.slider?.slider);

    const [openSlider, setOpenSlider] = useState(false);
    const [sliderInfo, setSliderInfo] = useState({
        title: "",
        file: null, // For storing the selected image file
        description: "",
    });
    const [error, setError] = useState("")


    const openSliderModal = () => {
        setOpenSlider(!openSlider);
    };
    // 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSliderInfo({
            ...sliderInfo,
            [name]: value,
        });
    };
    // 
    const handleImageUpload = (e) => {
        const selectedVideo = e.target.files[0]; // Get the selected image file
        setSliderInfo({
            ...sliderInfo,
            image: selectedVideo,
        });
    };
    // validate form
    const validateForm = () => {
        const { title, image, description } = sliderInfo;
        const errors = [];

        if (!title) {
            errors.push('Product Title');
        }

        if (!image) {
            errors.push('Product Image');
        }

        if (!description) {
            errors.push('Product description');
        }

        if (errors.length > 0) {
            setError(`Please include the following fields: ${errors.join(', ')}`);
            return false;
        }

        setError('');
        return true;
    };
    const upload = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const formData = new FormData();
        if (!validateForm()) return;
        formData.append('title', sliderInfo.title)
        formData.append('image', sliderInfo.image)
        formData.append('description', sliderInfo.description)

        dispatch(uploadSlider(formData))
            .then(res => {
                setSliderInfo({
                    title: "",
                    image: null,
                    description: "",
                });
                openSliderModal(false)
            })
    }
    // fetch data to sliderslice
    useEffect(() => {
        axios.get(`${adminbaseURL}/allslider`, { withCredentials: true })
          .then((response) => {
            dispatch(setslider(response.data));
            console.log(response.data);
          })
      }, [dispatch]);

    //   delete table items
    
  const removeProduct = (id) => {
    axios.delete(`${adminbaseURL}/slider/delete/${id}`)
        .then((res) => {
            dispatch(getSlider()); // Fetch updated tasks
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
                    src={`${mainURL}/Public/Slider/${row.file}`}
                    alt={row.title}
                    style={{ width: '50px', height: '50px' }}
                />
            ),
            sortable: true,
            wrap: true,
        },
        {
            name: 'Slider Title',
            selector: 'title', // Make sure to use the correct property name
            sortable: true,
            wrap: true,
        },
        {
            name: 'Description',
            selector: 'description', // Make sure to use the correct property name
            sortable: true,
            wrap: true,
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            cell: (row) => (
                <>
                    {/* <button onClick={() => handleEdit(row)}>Edit</button> */}
                    <button onClick={() => removeProduct(row._id)}><AiFillDelete/></button>
                </>
            ),
        }
      ];

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <span className="my-5 font-bold">Add slider here</span>
                <button
                    onClick={openSliderModal}
                    className="bg-[#F26D1E] p-2 hover:bg-[#fd9559] rounded-xl text-white font-bold"
                >
                    ADD SLIDER
                </button>
            </div>
            {openSlider && (
                <div
                    className="modal-container"
                    onClick={(e) => {
                        if (e.target.className === 'modal-container') setOpenSlider(false);
                    }}
                >
                    <div className="w-[700px] h-[70%] bg-white">
                        <div
                            className="h-full overflow-y-auto"
                            style={{
                                padding: '20px', // Add padding for better content spacing
                            }}
                        >
                            {error && <div className='p-5 bg-red-200 m-auto my-2 rounded-lg text-[#ca4747] font-bold'>{`incluse the field: ${error}`}</div>}
                            <form onSubmit={upload} className="flex flex-col justify-center items-center gap-4">
                                <span className='font-bold text-[1.6rem]'>ADD DETAILS: SLIDER</span>
                                <div className="">
                                    <label htmlFor="productName" className="font-bold">
                                        Slider Title here
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="p-2 border rounded-md"
                                        placeholder="Add your Slider's Title"
                                        value={sliderInfo.title}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="sliderImage" className="font-bold">
                                        Add slider Image
                                    </label>
                                    <input type="file"
                                        id="sliderImage"
                                        name="image"
                                        className='p-2'
                                        onChange={handleImageUpload} />

                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="description" className="font-bold">
                                        Add Slider Description
                                    </label>
                                    <textarea name="description" id="description" cols="38" rows="5"
                                        value={sliderInfo.description}
                                        onChange={handleInputChange}
                                        className='p-2' />

                                </div>
                                <button type='submit'
                                    className="bg-[#F26D1E] p-2 hover:bg-[#fd9559] rounded-xl text-white font-bold"
                                > ADD SLIDER </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
             <div className="container m-auto mb-5">
       <DataTable
                    title="Add items"
                    columns={columns}
                    // data={productsList || []} 
                    data={sliderList} 
                    pagination
                    highlightOnHover
                    customStyles={customStyles}
                    subHeader

                />
       </div>
        </div>
    );
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
export default Slider;
