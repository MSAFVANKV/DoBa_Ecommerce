import React, { useEffect } from "react";

import Doba from "../../../assets/images/doba_product_2.jpeg";
import wave from '../../../assets/images/wave_2.svg';

import Subtitle from "../../Shared/Subtitle";
import SearchBar from "../../Shared/SearchBar";
import { getVideosHome } from "../../ReduxToolKit/Admin/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { mainURL } from "../../Base/Constent";

function Welcome() {
  const dispatch = useDispatch();

  const getVideosSlice = useSelector((state) => state.video?.video)


  useEffect(() => {
    dispatch(getVideosHome())
  }, [dispatch]);
  return (
    <div className=' bg-[#F26D1E] section-container bg-gradient-to-t from-[#F26D1E] from-0% to-[#c95816] to-100%"'>
      <div className="md:flex py-20">
      <div className="md:w-1/2">
        
        <div className="flex flex-col items-center">
        <img
           src={Doba}
           alt=""
           className="w-[11rem] h-[11rem] border rounded-full"
         />
       <Subtitle subtitle={'Idly and Dosa batter'} />
       <h3 className="text-white sm:font-semibold text-center sm:text-[2rem] font-comforter2 ">This batter is made fresh with rich organic ingredients and fermented naturally</h3>

        </div>
        <div className="lg:m-8 mt-5 flex flex-col justify-center">
             <SearchBar />
           </div>


     </div>

     {/* second half === videoside */}
     <div className="md:w-1/2 space-y-7 lg:pt-0 pt-3 sm:col-span-4 sm:w-[100%] hidden sm:flex justify-center items-center  home_video-box gap-5 px-4">
      
         {getVideosSlice && getVideosSlice.length > 0 && (
             getVideosSlice.slice(0, 3).map((media) => {
               return (
                 <div key={media._id}>
                   <div className="flex justify-center font-comforter2 font-bold">
                     <p className='absolute'>{media.videoName}</p>
                   </div>
                   {media.videos.map((video, index) => (
                     <div key={index}>
                       <video
                        preload="auto"
                         controls
                         muted 
                         // height={'220px'}
                         controlsList='nodownload'
                         className='video_size'
                         // style={{height:"220px"}}
                         >
                         <source src={`${mainURL}${video}`} />
                       </video>
                     </div>
                   ))}
                 </div>
               );
             })
           )}
 
    
     </div>
      </div>
      {/* <img src={wave} className='' alt="" /> */}

    </div>
  );
}

export default Welcome;
