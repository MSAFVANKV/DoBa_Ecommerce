import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode , Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

import img from '../../../assets/images/doba_product_2.jpeg'
import { getProducts } from '../../ReduxToolKit/Admin/ProductsSlice';
import { mainURL } from '../../Base/Constent';

// icons
import { BsFillHeartFill } from 'react-icons/bs'
import Sample from './Sample';


function Items() {
  const dispatch = useDispatch()

  const getProductSlice = useSelector(state => state.products?.products);
  useEffect(() => {
    dispatch(getProducts()); // Fetch products when the component mounts
  }, [dispatch]);

  console.log(getProducts, 'getProducts')

  const [likedItems, setLikedItems] = useState([]);

  // const home_Product_Cards = [
  //   {
  //     id: 1,
  //     name: "IDLY",
  //     image: img,
  //     price: 2000,
  //     offer: "20%",
  //   },
  //   {
  //     id: 2,
  //     name: "IDLY",
  //     image: img,
  //     price: 2000,
  //     offer: "20%",
  //   },
  //   {
  //     id: 3,
  //     name: "Dosa",
  //     image: img,
  //     price: 2000,
  //     offer: "20%",
  //   },
  //   {
  //     id: 4,
  //     name: "IDLY",
  //     image: img,
  //     price: 2000,
  //     offer: "20%",
  //   },
  //   {
  //     id: 5,
  //     name: "IDLY",
  //     image: img,
  //     price: 2000,
  //     offer: "20%",
  //   },
  //   {
  //     id: 6,
  //     name: "IDLY",
  //     image: img,
  //     price: 2000,
  //     offer: "20%",
  //   },
  // ];

  const handleLikeClick = (itemId) => {
    if (likedItems.includes(itemId)) {
      // Unlike the item
      setLikedItems(likedItems.filter((id) => id !== itemId));
    } else {
      // Like the item
      setLikedItems([...likedItems, itemId]);
    }
  };
  return (
    <div className="">
      <h2 className='text-center text-[1.9rem] font-bold'>OUR PRODUCTS</h2>
      <div className='flex flex-wrap justify-center items-center gap-5 mx-10 my-10'>
        {getProductSlice.map((item, index) => (
         
          <div className="flex flex-col gap-6 group mb-20 relative shadow-lg text-black hover:shadow-2xl
              rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[200px] lg:w-[250px] cursor-pointer">
               <div 
               className="absolute gap inset-0 bg-cover bg-center rounded-xl" 
               style={{backgroundImage:`url(${mainURL}/Public/ProductsImages/${item.file})`}} 
               />

               <div className='absolute inset-0 bg-black opacity-5 group-hover:opacity-20 rounded-xl'/>
               <div className="relative flex flex-col gap-3">
                <p className='lg:text-[18px] font-bold'>{item.productName}</p>
               </div>
               {/* <RxArrowTopRight className='absolute bottom-5 left-5 w-[35px] h-[35px] text-black 
               group-hover:text-blue-600 group-hover:rotate-45 duration-100'/> */}
              </div>
        ))}
      </div>
    

    </div>
  );
}

export default Items;
