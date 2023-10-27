import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { Avatar } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import { getUser } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import LogoutIcon from '@mui/icons-material/Logout'
import Logo from '../../assets/icons8-film-80.png'
import { setUser } from '../../redux/slices/authSlice'

const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const [isActive, setIsActive] = useState(false)
  const { reload } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
        const { data } = await getUser()
        dispatch(setUser(data.user))
      } catch (error) {
        console.log(error)
      }
    }
    getUserDetails()
  }, [reload, dispatch])

  const API_URL = process.env.REACT_APP_API_URL
  const img = API_URL + `/${user.profileImg}`

  return (
    <nav className="navbar_container">
      <div className="navbar_logo">
        <div className='logo_container'>
          <Link to="/">
            <img className="logo_smith" src={Logo} alt="logo" />
            <h3 className='logo_title'>MovieReel</h3>
          </Link>
        </div>
        <div className="navbar_controls">
          <div className="navbar_avatar">
            <Avatar src={user.profileImg && img} />
          </div>
          <div
            className="navbar_hamburger"
            onClick={() => setIsActive(!isActive)}
          >
            {!isActive
              ? <MenuIcon sx={{ width: '30px', height: '50px' }} />
              : <MenuOpenIcon sx={{ width: '30px', height: '50px' }} />
            }
          </div>
        </div>

        {isActive && (
          <div className="pop_up">
            <div className="pop_wrapper">
              <div className="user_info">
                <div className="avatar_container">
                  <Avatar
                    src={user.profileImg && img}
                    sx={{
                      height: '90px',
                      width: '90px'
                    }}
                  />
                </div>
                <div className="user_details">
                  <p>{user.name}</p>
                  <small>{user.email}</small>
                </div>
              </div>
              <div className="controls">
                <div className="controls_nav" onClick={() => handleNavigate()}>
                  <TuneIcon sx={{ fontSize: '1rem', color: '#BB86Fc' }} />
                  <p>Settings</p>
                </div>
                <div className="controls_nav" onClick={() => logout()}>
                  <LogoutIcon sx={{ fontSize: '1rem', color: '#BB86Fc' }} />
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
