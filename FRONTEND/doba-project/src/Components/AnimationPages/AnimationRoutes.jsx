import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../../Pages/UserSide/Home'
import Login from '../../Pages/UserSide/Login'
import Register from '../../Pages/UserSide/Register'
import Products from '../../Pages/UserSide/Products'
import SearchBarPage from '../../Pages/UserSide/SearchBarPage'
import AboutUs from '../../Pages/UserSide/AboutUs'
import Sample from '../../Pages/UserSide/Sample'
import { ProductDetail } from '../ProductDetails/ProductDetail'
import Contact from '../../Pages/UserSide/Contact'

import { AnimatePresence } from 'framer-motion'
import Error from '../error/Error'
import Careers from '../Careers/Careers'
import CareerJobs from '../../Pages/UserSide/CareerJobs'
import Test from '../Careers/Test'

function AnimationRoutes() {
    const location = useLocation()
 
  useEffect(() => {
    // Set document title based on conditions

    const pathnames = ["/","/home", "/products", "/aboutus", "/contact" ,"/careers/:jobId/","/product/:productId",
     '/search', "/search/products"]
    
    if (pathnames.includes(location.pathname)){
        document.title = "Doba - "+document.title.split(" - ")[1]  
    } else{
      document.title = document.title.split(" - ")[0] +" - Doba"
    }
    
      // document.title = `DoBa - ${location.pathname.slice(1)}`;
    
  }, [ location.pathname]);
  return (
    
    <AnimatePresence>
        <Routes location={location} key={location.pathname} >
      <Route path="/" element={<Navigate to={'/home'} />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}
      {/* <Route path="/products" element={<Products />} /> */}
      {/* <Route path="/products/search" element={<SearchBarPage />} /> */}
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/sample" element={<Sample />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/careers/:jobId" element={<CareerJobs />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/search/products" element={<SearchBarPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<Error />} />

    </Routes>
    </AnimatePresence>
  )
}

export default AnimationRoutes