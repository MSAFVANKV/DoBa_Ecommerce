import React, { useEffect } from 'react';
import '../../Styles/Home.css'
import Doba from '../../../assets/images/doba_product_2.jpeg';
import Subtitle from '../../Shared/Subtitle';

// images
import wave from '../../../assets/images/wave_2.svg'
import waveTop from '../../../assets/images/wave_white.svg'

import chef from '../../../assets/images/chef-1.png'
import nature from '../../../assets/images/rice-icon.png'

// vdros
import video1 from '../../../assets/videos/video-1.mp4'
import video2 from '../../../assets/videos/video-2.mp4'
import SearchBar from '../../Shared/SearchBar';
import Sample from './Sample';
import { useDispatch, useSelector } from 'react-redux';
import { getSlider } from '../../ReduxToolKit/Admin/SliderSlice';
import { getProducts } from '../../ReduxToolKit/Admin/ProductsSlice';
import { adminbaseURL, mainURL } from '../../Base/Constent';
import { LiaExternalLinkAltSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import BannerHome from '../../Components/Banner/BannerHome';
import { getVideos } from '../../ReduxToolKit/Admin/videoSlice';


function Home() {
  const dispatch = useDispatch();
  const getProductSlice = useSelector((state) => state.products?.products);
  const getSliderSlice = useSelector((state) => state.slider?.slider);
  const getVideosSlice = useSelector((state) => state.video?.video)



  useEffect(() => {
    dispatch(getSlider()); // Fetch products when the component mounts
    dispatch(getProducts()); // Fetch products when the component mounts
    dispatch(getVideos())
  }, [dispatch]);
  return (
    <>
      <section className='wave bg-[#F26D1E]'>

        <BannerHome />
        {/* ======================================================================== */}
        {/* <div className="sm:grid md:grid-cols-8 grid-col justify-center"> */}
        <div className="">
          <img src={waveTop} className='' alt="" />

        </div>
        <div className="md:flex sm:p-[2rem] justify-center">


          {/* col-1 start ======================================*/}
          {/* <div className="bg-[#F26D1E]">

          </div> */}
          <div className="">
            <div className="hero_subtitle md:flex justify-center">
              {/* home image ================ */}
              <div className=" rounded-2xl drop sm:ms-0 flex justify-center ">
                <img src={Doba} alt="" className='w-[11rem] h-[11rem] border rounded-full' />
              </div>
              {/* subtitle============= */}
              <Subtitle subtitle={'Idly and Dosa batter'} />
            </div>
            <div className="w-[100%] flex">
              <span className='text-white font-semibold m-2 sm:text-[2rem] font-comforter2 text-center'>This batter is made fresh with rich organic ingredients and fermented naturally</span>
            </div>
            <div className="lg:m-8 mt-5 flex flex-col justify-center max-m-lg">
              <SearchBar />
            </div>
          </div>
          {/* videoss start && col-2 start ====*/}
          <div className=" lg:pt-0 pt-3 sm:col-span-4 sm:w-[100%] grid sm:flex justify-center items-center home_video-box gap-5">
            {/* ================= */}
            {getVideosSlice && getVideosSlice.length > 0 && (
              getVideosSlice.slice(0, 3).map((media) => {
                return (
                  <div key={media._id}>
                    <div className="flex justify-center font-comforter2 font-bold">
                      <p className='absolute'>{media.videoName}</p>
                    </div>
                    {media.videos.map((video, index) => (
                      <div key={index}>
                        <video preload="auto" width="100%" controls muted controlsList='nodownload'>
                          <source src={`${mainURL}${video}`} />
                        </video>
                      </div>
                    ))}
                  </div>
                );
              })
            )}


            {/* ===================== */}
            {/* <div className="sm:mt-5">
              <video src={video1} controls />
            </div>
            <div className="sm:mt-12">
              <video src={video2} controls />
            </div>
            <div className="sm:mt-20">
              <video src={video1} controls />
            </div> */}

          </div>
          {/* videoss end && col-2 end ====*/}

        </div>
        {/* ===================================Section end===================================== */}

      </section>
      <img src={wave} className='' alt="" />

      <section>

        {/* {getProductSlice && getProductSlice.length > 0 ?<Items/> : null} */}
        <h2 className='text-center text-[1.9rem] font-bold'>OUR PRODUCTS</h2>
        <div className='flex flex-wrap justify-center items-center gap-5 mx-10 my-10'>
          {
            getProductSlice.slice(0, 4).map((item, index) => (
              <Link to={`/product/${item._id}`} key={item._id}>


                <div className="flex flex-col gap-6 group relative shadow-lg text-black hover:shadow-2xl
              rounded-xl md:px-6 py-8 w-[100px] h-[110px] sm:h-[180px] sm:w-[200px] md:h-[200px] md:w-[215px] lg:h-[200px] lg:w-[250px] cursor-pointer">
                  <div
                    className="absolute gap inset-0 bg-cover bg-center rounded-xl"
                    style={{ backgroundImage: `url(${mainURL}/Public/ProductsImages/${item.file})` }}
                  />

                  <div className=' absolute inset-0 bg-black opacity-5 group-hover:opacity-20 rounded-xl' />
                  <div className="relative flex flex-col text-black p-3 border bg-white opacity-50 group-hover:opacity-80 gap-2">
                    <p className='lg:text-[18px] md:text-[15px] text-[12px] font-bold'>{item.productName.length > 8
                      ? `${item.productName.slice(0, 8)}...`
                      : item.productName}</p>
                    <p className='lg:text-[18px] md:text-[15px] text-[12px]  font-bold'>₹{item.price}</p>

                  </div>
                  <LiaExternalLinkAltSolid className='sm:block absolute hidden bottom-5 left-5 sm:w-[35px] sm:h-[35px] text-black 
               group-hover:text-blue-600 group-hover:rotate-45 duration-100'/>
                </div>
                {/* <ProductDetail product={item} /> */}
              </Link>
            ))
          }
        </div>

        <div className="text-center">
          <Link to="/products">
            <button className="btn my-3 shadow-xl">Take to store</button>
          </Link>
        </div>

        {/* slider started here */}
        {getSliderSlice && getSliderSlice.length > 0 ? <Sample /> : null}
      </section>
      {/* why us */}
      <div className=' w-[100%] text-center'>
        <div className="my-5">
          <span className='text-[2rem] font-bold'>WHY DoBa</span>
        </div>
        <div className="flex justify-center h-[700px] lg:h-[250px]">
          <div className="md:grid md:grid-cols-2  w-[80%] h-[250px]  gap-5">
            <div className="bg-[#FFAE79] rounded-xl shadow-xl ">
              <span className='text-[1.6rem] font-bold '>QUALITY</span>
              <div className="lg:grid lg:grid-cols-3">
                <div className="flex items-center justify-center">
                  <img src={chef} alt="chef" className="lg:h-[70%] h-[100px]" />
                </div>
                <div className="flex capitalize font-extralight text-[1.1rem] items-center text-start p-3  col-span-2">
                  <p>"We make sure that every batch of production undergoes international
                    quality processes without fail. All processes are done by our machines."</p>
                </div>
              </div>
            </div>
            {/* 2nd col */}
            <div className="bg-[#BBD8FF] rounded-xl shadow-xl mt-6 lg:mt-0">
              <span className='text-[1.6rem] font-bold uppercase lg:mt-5'>NATURE</span>
              <div className="lg:grid lg:grid-cols-3">
                <div className="flex items-center justify-center">
                  <img src={nature} alt="chef" className="lg:h-[70%] h-[100px]" />
                </div>
                <div className="flex lg:mt-8 capitalize font-extralight text-[1.1rem] items-center text-start p-3  col-span-2">
                  <p>We believe in the power of natural ingredients..You won't find any artificial additives
                    or preservatives in our products. Zero Chemicals, Zero Compromises"</p>
                </div>
              </div>
            </div>
            {/* end */}
          </div>
        </div>
      </div>


    </>
  );
}

export default Home;
