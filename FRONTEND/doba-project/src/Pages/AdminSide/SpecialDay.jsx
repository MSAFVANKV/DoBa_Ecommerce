import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBanner, setBanner, uploadBanner } from '../../ReduxToolKit/Admin/bannerSlice';
import { getVideos, uploadVideo } from '../../ReduxToolKit/Admin/videoSlice';
import Banner from './Banner';
import VideoBanner from './VideoBanner';
import axios from 'axios';
import { adminbaseURL } from '../../Base/Constent';

function SpecialDay() {
  const dispatch = useDispatch()
  const [fileType, setFileType] = useState("image")
  const error = useSelector((state) => state.banner.error);
//   useEffect(() => {
//     dispatch(uploadBanner())
// }, [dispatch]);
  // useEffect(() => {
  //   axios.get(`${adminbaseURL}/allbanner`, { withCredentials: true })
  //     .then((response) => {
  //       dispatch(setBanner(response.data));
  //       console.log(response.data);
  //     })
  // }, [dispatch]);

  const [bannerInfo, setBannerInfo] = useState({
    bannerName: "",
    // videoName:"",
    file: null,
    // videoFile:null
  })
  const [videos, setBannerVideos] = useState({
    videoName: "",
    videoFile: null
  })
  // const [videos, setBannerVideos] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBannerInfo({
      ...bannerInfo,
      [name]: value,
    });
  };

  // 
  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0]; // Get the selected image file
    setBannerInfo({
      ...bannerInfo,
      image: selectedImage,
    });
  };
  // const handleFileUpload = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setBannerInfo({
  //     ...bannerInfo,
  //     [fileType === 'video' ? 'videoFile' : 'file']: selectedFile,
  //   });
  // };

  const handleVideoNameChange = (e) => {
    setBannerVideos({
      ...videos,
      videoName: e.target.value
    });
  };
  
  const handleVideoFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setBannerVideos({
      ...videos,
      videoFile: selectedFile
    });
  };

  // const upload = (e) => {
  //   e.preventDefault();
  //   // if (!bannerInfo.bannerName || !bannerInfo.image) {
  //   //   const result = window.confirm("Banner name and image are required.");
  //   //   if (result) {
  //   //     return;
  //   //   }
  //   // }
  //   const formData = new FormData();
  //   formData.append('bannerName', bannerInfo.bannerName)
  //   formData.append('image', bannerInfo.image)

  //   dispatch(uploadBanner(formData))
  //     .then(res => {
  //       setBannerInfo({
  //         bannerName: "",
  //         image: null,
  //       });
  //       dispatch(getBanner());
  //     })
  // }
  const upload = async (e) => {
    e.preventDefault();
    
    try {
        const formData = new FormData();
        formData.append('bannerName', bannerInfo.bannerName);
        formData.append('image', bannerInfo.image);

        await dispatch(uploadBanner(formData));
        setBannerInfo({
            bannerName: "",
            image: null,
        });
        await dispatch(getBanner());
    } catch (error) {
        console.error("Error uploading banner:", error);
    }
}

  // =========================================
 
const uploadVideoFile = async (e) => {
  e.preventDefault();

  try {
      const formData = new FormData();
      formData.append('videoName', videos.videoName);
      formData.append('videos', videos.videoFile);

      await dispatch(uploadVideo(formData));
      setBannerVideos({
          videoName:"",
          videoFile:null
      });
      await dispatch(getVideos());
  } catch (error) {
      console.error("Error uploading video:", error);
  }
}


  return (
    <div className="w-[100%] pt-3 h-[100%] flex flex-col items-center">
      <div className="flex gap-2 mb-3">
        Register as
        <input
          type="radio"
          name="UserType"
          value="image"
          checked={fileType === 'image'}
          onChange={() => setFileType('image')}
        /> Image
        <input
          type="radio"
          name="UserType"
          value="video"
          checked={fileType === 'video'}
          onChange={() => setFileType('video')}
        /> Video
      </div>
      {fileType === "image" ? (
        <form onSubmit={upload} className='border p-2 w-[300px] h-[300px]'>
          <input
            type="text"
            id="bannerName"
            name="bannerName"
            className="p-2 border rounded-md my-3"
            placeholder="Add your product's name"
            value={bannerInfo.bannerName}
            onChange={handleInputChange}
          />
          <div className="mt-5">
            <label htmlFor="bannerImage" className="font-bold w-[282px] label_banner ">
              Add slider Image
            </label>
            <input
              type="file"
              id="bannerImage"
              name="image"
              accept="image/*"
              className="p-2"
              onChange={handleImageUpload}
            />
            {error && <div className='text-red-500 p-5'>{error}</div>}
            <div className="flex justify-center pt-5">
            {bannerInfo.file ? (
              <img src={URL.createObjectURL(bannerInfo.file)} alt="" width="70px" />
            ) : null}
            </div>
          </div>
          <div className="flex justify-center mt-1">
            <button type="submit" className="bt bg-slate-500 p-2 rounded-2xl font-bold text-white">
              SUBMIT
            </button>
          </div>
        </form>
        // =============  video section  ========================
      ) : fileType === "video" ? (
        <form onSubmit={uploadVideoFile} className='border p-2 w-[300px] h-[300px]'>
          <input
            type="text"
            id="videoName"
            name="videoName"
            className="p-2 border rounded-md my-3"
            placeholder="Add your product's name"
            value={videos.videoName}
            onChange={handleVideoNameChange}
          />
          <div className="mt-5">
            <label htmlFor="bannerVideo" className="font-bold w-[282px] label_banner ">
              Add banner video
            </label>
            {/* video input */}
            <input
              type="file"
              id="bannerVideo"
              name="videos"
              accept=".mp4, .mkv"
              className=""
              onChange={handleVideoFileChange}
            />
          </div>
          <div className="flex justify-center pt-5">
            {videos.videoFile ? (
              <video src={URL.createObjectURL(videos.videoFile)} alt="" width="30px" />
            ) : null}
            </div>
          
          <div className="flex justify-center mt-1">
            <button type="submit" className="bt bg-slate-500 p-2 rounded-2xl font-bold text-white">
              SUBMIT
            </button>
          </div>
        </form>
      ) : null}
      {fileType && fileType === 'image' && <Banner />}
      {fileType && fileType === 'video' && <VideoBanner />}

    </div>
  );
}

export default SpecialDay;
