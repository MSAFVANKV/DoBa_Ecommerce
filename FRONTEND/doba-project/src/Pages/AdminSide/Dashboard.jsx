import axios from 'axios';
import React, { useEffect } from 'react';
import { adminbaseURL, userURL } from '../../Base/Constent';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

// fetched items from slices
import { setProducts } from '../../ReduxToolKit/Admin/ProductsSlice';
import { getSlider, setslider } from '../../ReduxToolKit/Admin/SliderSlice';
import { getBanner, setBanner } from '../../ReduxToolKit/Admin/bannerSlice';
import { getVideos } from '../../ReduxToolKit/Admin/videoSlice';
import { formsingle } from '../../ReduxToolKit/User/SingleFormSlice';

// icons
import { FaOpencart } from 'react-icons/fa';
import { LuMessageSquareDashed } from 'react-icons/lu';
import { TfiLayoutSlider } from 'react-icons/tfi';
import { GiTatteredBanner } from 'react-icons/gi';


const ringAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const RingingIcon = styled(LuMessageSquareDashed)`
  font-size: 3.5rem;
  bottom: 0;
  color: white;
  position: absolute;

  &:hover {
    animation: ${ringAnimation} 1s ease-in-out infinite;
  }
`;

function Dashboard({ setIsAdminLoggedIn }) {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products?.products);
  const sliderList = useSelector(state => state.slider?.slider);
  const getBannerList = useSelector((state) => state.banner.banner);
  const getVideosList = useSelector((state) => state.video.video);
  const SingleFormCollections = useSelector(state => state.form.form);


  useEffect(() => {
    // Fetch products
    axios.get(`${adminbaseURL}/allproducts`, { withCredentials: true })
      .then((response) => {
        dispatch(setProducts(response.data));
        console.log(response.data);
      });
  }, [dispatch]);

     // fetch data to sliderslice
     useEffect(() => {
      dispatch(getSlider()); // Fetch products when the component mounts
      dispatch(getBanner());
      dispatch(getVideos());
    }, [dispatch]);

    // all messages
    useEffect(() => {
      axios.get(`${userURL}/singleform/getall`, { withCredentials: true })
        .then((response) => {
          dispatch(formsingle(response.data));
          console.log(response.data);
        })
    }, [dispatch]);
    

  return (
    <div className="container mx-auto">
      <div className="page-container justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[25%] lg:grid-cols-4 text-center rounded-xl m-10 gap-10">
          {/* Products */}
          <div className="bg-red-400 relative col-span-1 p-6 flex flex-col justify-center font-bold w-[200px] rounded-xl">
            PRODUCTS
            <div>
              {productsList && productsList.length > 0 && (
                <span>{productsList.length} Nos</span>
              )}
              <FaOpencart className="text-[4rem] bottom-0 text-white absolute hover:translate-x-8 transition-all" />
            </div>
          </div>

          {/* Slider */}
          <div className="bg-green-400 relative col-span-1 p-6 flex flex-col justify-center font-bold w-[200px] rounded-xl">
            SLIDERS
            <div>
              {sliderList && sliderList.length > 0 && (
                <span>{sliderList.length} Nos</span>
              )}
              <TfiLayoutSlider className="text-[3.5rem] bottom-0 hover:translate-x-2 transition-all text-white absolute" />
            </div>
          </div>

          {/* Banners */}
          <div className="bg-blue-400 relative col-span-1 p-6 flex flex-col justify-center font-bold w-[200px] rounded-xl">
            BANNERS
            <div>
              {getBannerList && getBannerList.length > 0 && (
                <span>{getBannerList.length} img ,</span>
              )}
               {getVideosList && getVideosList.length > 0 && (
                <span>{getVideosList.length} vids</span>
              )}
              <GiTatteredBanner className="text-[4rem] bottom-0 text-white absolute hover:rotate-6" />
            </div>
          </div>

          {/* Messages */}
          <div className="bg-slate-400 relative col-span-1 p-6 flex flex-col justify-center font-bold w-[200px] rounded-xl">
            MESSAGES
            <div>
              {SingleFormCollections && SingleFormCollections.length > 0 ? (
                <span>{SingleFormCollections.length} SMS</span>
              ):<span>0 SMS</span>}
              <RingingIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
