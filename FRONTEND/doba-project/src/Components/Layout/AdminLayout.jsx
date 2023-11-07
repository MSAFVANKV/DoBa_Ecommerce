import React from 'react'
import AdminRouter from '../../Router/AdminRouter'
import AdminHeader from '../AdminHeader/AdminHeader'
import Footer from '../Footer/Footer'

function AdminLayout() {
  return (
    <div>
        {/* <AdminHeader/> */}
        <AdminRouter/>
        {/* <Footer/> */}
    </div>
  )
}

export default AdminLayout