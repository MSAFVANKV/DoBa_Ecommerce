// ImageForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadBanner, getBanner } from '../../ReduxToolKit/Admin/bannerSlice';
import { Button, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, TextField, Container, Box } from '@mui/material';

function ImageForm() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.banner.error);

  const [bannerInfo, setBannerInfo] = useState({
    bannerName: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBannerInfo({
      ...bannerInfo,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setBannerInfo({
      ...bannerInfo,
      image: selectedImage,
    });
  };

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
  };

  return (
    // <form onSubmit={upload} className='border p-2 w-[300px] h-[300px]'>
    //   <input type="text" name="bannerName" value={bannerInfo.bannerName} onChange={handleInputChange} />
    //   <input type="file" name="image" accept="image/*" onChange={handleImageUpload} />
    //   {error && <div className='text-red-500 p-5'>{error}</div>}
    //   <button type="submit" className="bt bg-slate-500 p-2 rounded-2xl font-bold text-white">
    //     SUBMIT
    //   </button>
    // </form>
    <form onSubmit={upload}>
    <TextField
      type="text"
      id="bannerName"
      name="bannerName"
      label="Add your product's name"
      value={bannerInfo.bannerName}
      onChange={handleInputChange}
      fullWidth
      margin="normal"
    />
    <input
      type="file"
      id="bannerImage"
      name="image"
      accept="image/*"
      onChange={handleImageUpload}
    />
    {error && <div className="text-red-500 p-5">{error}</div>}
    <Box mt={5}>
    {bannerInfo.image && (
                <img src={URL.createObjectURL(bannerInfo.image)} alt="" width="30px" />
              )}
    </Box>

    <Box mt={3}>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  </form>
  );
}

export default ImageForm;
