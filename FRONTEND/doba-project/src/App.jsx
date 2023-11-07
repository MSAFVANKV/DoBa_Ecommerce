import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import AdminLayout from './Components/Layout/AdminLayout'
import './Styles/Home.css'

function App() {

  return (
    <>
     <Layout/>
     {/* <Routes>
        <Route path='/admin' element={<AdminLayout/>}/>
     </Routes> */}
     <AdminLayout/>
    </>
  )
}

export default App
