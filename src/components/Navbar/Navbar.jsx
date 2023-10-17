import React, { useState } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'

const Navbar = () => {
  const [isActive, setIsActive] = useState(false)
  return (
    <nav className="navbar_container">
      <div className="navbar_logo">
        <Link to="/">
          <h3>MovieReel</h3>
        </Link>
        <div className="navbar_controls">
          <div
            className="navbar_hamburger"
            onClick={() => setIsActive(!isActive)}
          >
            {!isActive ? (
              <MenuIcon sx={{ width: '30px', height: '50px' }} />
            ) : (
              <MenuOpenIcon sx={{ width: '30px', height: '50px' }} />
            )}
          </div>
        </div>

        {isActive && (
          <div className="pop_up">
            <div className="pop_wrapper">
              <div className="user_info">
                <div className="avatar_container">Avatar</div>
                <div className="user_details">
                  <p>Smith Ringtho</p>
                  <small>sringtho@gmail.com</small>
                </div>
              </div>
              <div className="controls">
                <div>
                  <p>Update Account</p>
                </div>
                <div>
                  <p>LogOut</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar