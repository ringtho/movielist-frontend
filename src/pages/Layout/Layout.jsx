import React from 'react'
import './Layout.scss'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main className='layout_container'>
        <Navbar />
        <Outlet />
    </main>
  )
}

export default Layout
