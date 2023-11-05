import React from 'react';
import '../../Styles/Home.css'
import Doba from '../../../assets/images/doba_product_2.jpeg';
import Subtitle from '../../Shared/Subtitle';

// images
import wave from '../../../assets/images/wave_2.svg'

// vdros
import video1 from '../../../assets/videos/video-1.mp4'
import video2 from '../../../assets/videos/video-2.mp4'


function Home() {
  return (
    <section className='wave'>
      <div className="sm:grid md:grid-cols-8 grid-col justify-center">
        {/* col-1 start ======================================*/}
        <div className="bg-[#F26D1E]"></div>
        <div className="bg-[#F26D1E] col-span-3 col-start-2">
          <div className="hero_subtitle md:flex ">
            {/* home image ================ */}
            <div className="bg-[#F26D1E] rounded-2xl drop sm:ms-0 flex justify-center mt-5">
              <img src={Doba} alt="" className='w-[11rem] h-[11rem] border rounded-full' />
            </div>
            {/* subtitle============= */}
            <Subtitle subtitle={'Idly and Dosa batter'} />
          </div>
          <div className="w-[100%] flex">
          <span className='text-white font-extrabold sm:text-[2rem] text-center'>This batter is made fresh with rich organic ingredients and fermented naturally</span>
          </div>
        </div>
        {/* videoss start && col-2 start ====*/}
        <div className="bg-[#F26D1E] col-span-4 flex justify-center items-center home_video-box gap-5">
          <div className="sm:mt-5">
            <video src={video1} controls />
          </div>
          <div className="sm:mt-10">
            <video src={video2} controls />
          </div>
          <div className="sm:mt-16">
            <video src={video1} controls />
          </div>

        </div>
         {/* videoss end && col-2 end ====*/}

      </div>
      <img src={wave} alt="" />
    </section>

  );
}

export default Home;
