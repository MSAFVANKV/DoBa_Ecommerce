import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editProduct, getProducts, uploadProduct } from '../../ReduxToolKit/Admin/ProductsSlice';

import { adminbaseURL } from '../../Base/Constent';
import { IoCloseCircleSharp } from 'react-icons/io5'

function ModalProducts({ closeModal, selectedProduct }) {

    const dispatch = useDispatch()
    const [error, setError] = useState("")

    const [productInfo, setProductInfo] = useState({
        productName: selectedProduct?.productName || '',
        price: selectedProduct?.price || '',
        file: null,
        description: selectedProduct?.description || '',
        category: selectedProduct?.category || 'dosa',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductInfo({
            ...productInfo,
            [name]: value,
        });
    };

    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0]; // Get the selected image file
        setProductInfo({
            ...productInfo,
            image: selectedImage,
        });
    };

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const validateForm = () => {
        const { productName, price, image, category, description } = productInfo;
        const errors = [];

        if (!productName) {
            errors.push('Product Name');
        }

        if (!price) {
            errors.push('Product Price');
        }

        if (!image) {
            errors.push('Product Image');
        }

        if (!description) {
            errors.push('Product Category');
        }

        if (!category) {
            errors.push('Product Category');
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
        if (!selectedProduct&&!validateForm()) {
            return;
        }
        const formData = new FormData();
        // Add other form data fields
        formData.append('productName', productInfo.productName);
        formData.append('price', productInfo.price);
        formData.append('image', productInfo.image);
        formData.append('description', productInfo.description);
        formData.append('category', productInfo.category);

        // Check if it's an edit or add operation
        if (selectedProduct) {
            // Add product ID for editing
            formData.append('_id', selectedProduct?._id);
            // Call editProduct action
            dispatch(editProduct(formData)).then((res) => {
                // Handle success or error
                closeModal();
                dispatch(getProducts());
            });
        } else {
            // Call uploadProduct action for adding
            dispatch(uploadProduct(formData)).then((res) => {
                // Handle success or error
                setProductInfo({
                    productName: '',
                    price: '',
                    image: null,
                    description: '',
                    category: 'dosa',
                });
                closeModal();
            });
        }
    };


    const handleClose = () => {
        if (productInfo.productName || productInfo.description || productInfo.file) {
            const result = window.confirm("You have unsaved changes. Are you sure you want to close?");
            if (result) {
                closeModal();
            }
            return
        }
        closeModal()
    }


    return (
        <div className="modal-container" onClick={(e) => { if (e.target.className === 'modal-container') handleClose() }}>
            <div className={`${error ? 'sm:pt-36 pt-60' : 'pt-10'} sm:w-[50%] w-[80%] h-[90%] sm:max-h-[600px] bg-white justify-center items-center flex rounded-lg overflow-y-auto`}>

                <form onSubmit={upload} className="flex flex-col gap-5 text-start mt-[15rem] p-4 w-[100%]">
                    {/* madal close icon */}
                    <div className="">
                        <IoCloseCircleSharp className='float-right text-[2rem] cursor-pointer' onClick={handleClose} />
                    </div>
                    {/* madal close icon end*/}

                    <span className="font-bold lg:text-[1.3rem] mb-2">
                        <span className="font-bold lg:text-[1.3rem] mb-2">
                            {selectedProduct ? 'EDIT DETAILS: PRODUCT CARDS' : 'ADD DETAILS: PRODUCT CARDS'}
                        </span>
                    </span>
                    {/* ========== */}
                   
                    <div className="flex flex-col">
                        <label htmlFor="productName" className="font-bold">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            className="p-2 border rounded-md"
                            placeholder="Add your product's name"
                            value={productInfo.productName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="productPrice" className="font-bold">
                            Product Price
                        </label>
                        <input
                            type="number"
                            id="productPrice"
                            name="price"
                            className="p-2 border rounded-md"
                            placeholder="Product price"
                            value={productInfo.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="productImage" className="font-bold">
                            Add Product Image
                        </label>
                        <input type="file"
                            id="productImage"
                            name="image"
                            onChange={handleImageUpload} />

                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="font-bold">
                            Add Product Description
                        </label>
                        <textarea name="description" id="description" cols="30" rows="5"
                            value={productInfo.description}
                            onChange={handleInputChange}
                            className='p-2' />

                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="productCategory" className="font-bold">
                            Product Category
                        </label>
                        <select
                            id="productCategory"
                            name="category"
                            className="w-[50%] p-2 border rounded-md"
                            value={productInfo.category}
                            onChange={handleInputChange}
                        >
                            <option value="dosa">DOASA</option>
                            <option value="idly">IDLY</option>
                        </select>
                    </div>
                    {error && <div className='p-5 bg-red-200 m-auto my-2 rounded-lg text-[#ca4747] sm:text-[1rem] text-[0.8rem] font-bold'>{`incluse the field: ${error}`}</div>}

                    <button type="submit" className="bg-[#F26D1E] p-2 my-5 border rounded-xl  text-white font-bold">
                        {selectedProduct ? 'Edit' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalProducts;
