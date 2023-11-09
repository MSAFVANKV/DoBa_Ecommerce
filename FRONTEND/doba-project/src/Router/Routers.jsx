import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../Pages/UserSide/Home';
import Login from '../Pages/UserSide/Login';
import Register from '../Pages/UserSide/Register';
import SearchBarPage from '../Pages/UserSide/SearchBarPage';
import Products from '../Pages/UserSide/Products';
import AboutUs from '../Pages/UserSide/AboutUs';
import Sample from '../Pages/UserSide/Sample';
import { ProductDetail } from '../Components/ProductDetails/ProductDetail';

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/home'} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/search" element={<SearchBarPage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/sample" element={<Sample />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
    </Routes>
  );
}

export default Routers;
