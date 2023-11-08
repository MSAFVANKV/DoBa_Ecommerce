import React, { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../ReduxToolKit/Admin/ProductsSlice';
import { mainURL } from '../../Base/Constent';

import { RxArrowTopRight } from 'react-icons/rx'


function Sample({ items }) {
  const dispatch = useDispatch();
  const getProductSlice = useSelector((state) => state.products?.products);

  useEffect(() => {
    dispatch(getProducts()); // Fetch products when the component mounts
  }, [dispatch]);

  return (
    <>
      <div className="flex items-center justify-center flex-col h-screen ">{/*bg-[#6334af] */}
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="max-w-[95%] lg:max-w-[80%]"
        >
          {getProductSlice.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col gap-6 group mb-20 relative shadow-lg text-white hover:shadow-2xl
              rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] cursor-pointer">
               <div 
               className="absolute inset-0 bg-cover bg-center rounded-xl" 
               style={{backgroundImage:`url(${mainURL}/Public/ProductsImages/${item.file})`}} 
               />

               <div className='absolute inset-0 bg-black opacity-5 group-hover:opacity-20 rounded-xl'/>
               <div className="relative flex flex-col gap-3">
                <p className='lg:text-[18px] font-semibold text-black capitalize'>{item.description}</p>
               </div>
               <RxArrowTopRight className='absolute bottom-5 left-5 w-[35px] h-[35px] text-black 
               group-hover:text-blue-600 group-hover:rotate-45 duration-100'/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Sample;
