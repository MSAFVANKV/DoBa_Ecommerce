import React, { useRef, useState } from 'react';
import { LuImagePlus } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { getBanner, uploadBanner, uploadBannerVideo } from '../../ReduxToolKit/Admin/bannerSlice';

function SpecialDay() {
  const dispatch = useDispatch()
  const [fileType, setFileType] = useState("image")


  const [bannerInfo, setBannerInfo] = useState({
    bannerName: "",
    file: null,
    videoFile:null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBannerInfo({
      ...bannerInfo,
      [name]: value,
    });
  };

  // 
  // const handleImageUpload = (e) => {
  //   const selectedImage = e.target.files[0]; // Get the selected image file
  //   setBannerInfo({
  //     ...bannerInfo,
  //     image: selectedImage,
  //   });
  // };
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setBannerInfo({
      ...bannerInfo,
      [fileType === 'video' ? 'video' : 'image']: selectedFile,
    });
  };


  const upload = (e) => {
    e.preventDefault();
    if (!bannerInfo.bannerName || !bannerInfo.image) {
      const result = window.confirm("Banner name and image are required.");
      if (result) {
        return;
      }
    }
    const formData = new FormData();
    formData.append('bannerName', bannerInfo.bannerName)
    formData.append('image', bannerInfo.image)

    dispatch(uploadBanner(formData))
      .then(res => {
        setBannerInfo({
          bannerName: "",
          image: null,
        });
        dispatch(getBanner());
      })
  }
// =========================================
  const uploadVideo = (e) => {
    e.preventDefault();
    // if (!bannerInfo.bannerName || !bannerInfo.image) {
    //   const result = window.confirm("Banner name and image are required.");
    //   if (result) {
    //     return;
    //   }
    // }
    const formData = new FormData();
    formData.append('bannerName', bannerInfo.bannerName)
    formData.append('video', bannerInfo.video)

    dispatch(uploadBannerVideo(formData))
      .then(res => {
        setBannerInfo({
          bannerName: "",
          video: null,
        });
        dispatch(getBanner());
      })
  }

  return (
    <div className="w-[100%] mt-5 h-[100vh] flex flex-col items-center">
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
      <form onSubmit={upload} className='bg-slate-400 w-[300px] h-[350px]'>
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
          <label htmlFor="bannerImage" className="font-bold w-[300px] label_banner ">
            Add slider Image
          </label>
          <input
            type="file"
            id="bannerImage"
            name="image"
            accept="image/*"
            className="p-2"
            onChange={handleFileUpload}
          />
        </div>
        <div className="flex justify-center mt-10">
          <button type="submit" className="btn">
            SUBMIT
          </button>
        </div>
      </form>
      // =============  video section  ========================
    ) : fileType === "video" ? (
      <form onSubmit={uploadVideo} className='bg-slate-400 w-[300px] h-[350px]'>
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
          <label htmlFor="bannerVideo" className="font-bold w-[300px] label_banner ">
            Add banner video
          </label>
          <input
            type="file"
            id="bannerVideo"
            name="video"
            accept="video/*"
            className="p-2"
            onChange={handleFileUpload}
          />
        </div>
        <div className="flex justify-center mt-10">
          <button type="submit" className="btn">
            SUBMIT
          </button>
        </div>
      </form>
    ) : null}
  </div>
  );
}

export default SpecialDay;
