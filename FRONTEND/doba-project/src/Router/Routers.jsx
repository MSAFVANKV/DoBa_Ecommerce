

import React from 'react'
import {Routes ,Route, Navigate} from 'react-router-dom'
import Home from '../Pages/UserSide/Home'
import Login from '../Pages/UserSide/Login'
import Register from '../Pages/UserSide/Register'
import SearchBar from '../Pages/UserSide/SearchBar'
import Products from '../Pages/UserSide/Products'
import AboutUs from '../Pages/UserSide/AboutUs'


function Routers() {
  return (
    <Routes>
        <Route path='/' element={<Navigate to={'/home'}/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/products/search' element={<SearchBar/>} />
        <Route path='/aboutus' element={<AboutUs/>} />
    </Routes>
  )
}

export default Routers