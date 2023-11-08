import React from 'react';
import '../../Styles/Home.css'
import Doba from '../../../assets/images/doba_product_2.jpeg';
import Subtitle from '../../Shared/Subtitle';
import Items from './Items';
import GMap from '../../Components/GMap/GMap';

// images
import wave from '../../../assets/images/wave_2.svg'
import chef from '../../../assets/images/chef-1.png'
import nature from '../../../assets/images/rice-icon.png'

// vdros
import video1 from '../../../assets/videos/video-1.mp4'
import video2 from '../../../assets/videos/video-2.mp4'
import SearchBar from '../../Shared/SearchBar';
import Sample from './Sample';


function Home() {
  return (
    <>
      <section className='wave'>
        <div className="sm:grid md:grid-cols-8 grid-col justify-center">
          {/* col-1 start ======================================*/}
          <div className="bg-[#F26D1E]"></div>
          <div className="bg-[#F26D1E] col-span-3 col-start-2">
            <div className="hero_subtitle md:flex ">
              {/* home image ================ */}
              <div className="bg-[#F26D1E] rounded-2xl drop sm:ms-0 flex justify-center lg:mt-5">
                <img src={Doba} alt="" className='w-[11rem] h-[11rem] border rounded-full mt-2' />
              </div>
              {/* subtitle============= */}
              <Subtitle subtitle={'Idly and Dosa batter'} />
            </div>
            <div className="w-[100%] flex">
              <span className='text-white font-extrabold sm:text-[2rem] text-center'>This batter is made fresh with rich organic ingredients and fermented naturally</span>
            </div>
            <div className="lg:m-8 mt-5 flex flex-col justify-center max-m-lg">
              <SearchBar />
            </div>
          </div>
          {/* videoss start && col-2 start ====*/}
          <div className="bg-[#F26D1E] lg:pt-0 pt-3 sm:col-span-4 sm:w-[100%] grid sm:flex justify-center items-center home_video-box gap-5">
            <div className="sm:mt-5">
              <video src={video1} controls />
            </div>
            <div className="sm:mt-12">
              <video src={video2} controls />
            </div>
            <div className="sm:mt-20">
              <video src={video1} controls />
            </div>

          </div>
          {/* videoss end && col-2 end ====*/}

        </div>
        <img src={wave} alt="" />
      </section>
      <section>
        {/* <Items/> */}
        <Sample />
      </section>
                {/* why us */}
                <div className=' w-[100%] text-center'>
              <div className="my-5">
                  <span className='text-[2rem] font-bold '>WHY DOBA</span>
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
