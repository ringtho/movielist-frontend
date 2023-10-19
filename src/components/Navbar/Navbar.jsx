import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { getUser } from '../../api'

const Navbar = () => {
  const [user, setUser] = useState({})
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('movieToken')
    navigate('/login')
  }

  const handleNavigate = () => {
    navigate('/profile')
    setIsActive(!isActive)
  }

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const {data}= await getUser()
        setUser(data.user)
      } catch (error) {
        console.log(error)
      }
    }
    getUserDetails()
  }, [])

  
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
                  <p>{user.name}</p>
                  <small>{ user.email }</small>
                </div>
              </div>
              <div className="controls">
                <div>
                  <p onClick={()=> handleNavigate()}>Profile</p>
                </div>
                <div>
                  <p onClick={() => logout()}>LogOut</p>
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