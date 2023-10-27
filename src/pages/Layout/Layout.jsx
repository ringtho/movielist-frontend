import React from 'react'
import './Layout.scss'
import { Navbar } from '../../components'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main className="layout_container">
      <Navbar />
      <div className='outlet_container'>
        <Outlet />
      </div>
    </main>
  )
}

export default Layout
