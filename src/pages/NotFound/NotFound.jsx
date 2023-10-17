import React from 'react'
import './NotFound.scss'
import { Link, useNavigate } from 'react-router-dom'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <main className="layout_container">
      <nav className="navbar_container">
        <div className="navbar_logo">
          <Link to="/">
            <h3>MovieReel</h3>
          </Link>
        </div>
      </nav>
      <section className="notfound_container">
        <p className="notfound_message">
          Why did the book go to therapy? It had too many missing pages, and it
          needed closure.?
        </p>
        <div className="notfound_wrapper">
          <HeartBrokenIcon sx={{ color: '#BB86Fc', fontSize: '4rem' }} />
          <p className="notfound_error">404</p>
          <p className="notfound_other">Page not Found!</p>
        </div>
        <button onClick={() => navigate('/')}>Home</button>
      </section>
    </main>
  )
}

export default NotFound

