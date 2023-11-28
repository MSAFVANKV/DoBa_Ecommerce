// ImageForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadBanner, getBanner } from '../../ReduxToolKit/Admin/bannerSlice';
import { Button, TextField, Container, Box } from '@mui/material';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';

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

  const handleImageUpload = ({ fileList: newFileList }) => {
    setBannerInfo({
      ...bannerInfo,
      image: newFileList, // Update the image property in the state
    });
  };

  const upload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('bannerName', bannerInfo.bannerName);

      // Append only the first file from the fileList array (the cropped image)
      if (bannerInfo.image && bannerInfo.image.length > 0) {
        formData.append('image', bannerInfo.image[0].originFileObj);
      }

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
      <ImgCrop rotationSlider aspect={19/ 7 } >
        <Upload
          listType="picture-card"
          fileList={bannerInfo.image}
          onChange={handleImageUpload}
        >
          {bannerInfo.image ? null : '+ Upload'}
        </Upload>
      </ImgCrop>

      {error && <div className="text-red-500 p-5">{error}</div>}
      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default ImageForm;
