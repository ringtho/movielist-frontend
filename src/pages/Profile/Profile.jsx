import React, { useEffect, useState } from 'react'
import './Profile.scss'
import { getUser, updatePassword, updateUserDetails } from '../../api'
import { Avatar, IconButton } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoading } from '../../redux/slices/moviesSlice'
import Loading from '../../components/Loading/Loading'
import ClearIcon from '@mui/icons-material/Clear'
import { setReload } from '../../redux/slices/authSlice'

const Profile = () => {
  const [user, setUser] = useState({})
  const [newPassword, setNewPassword] = useState({
    oldPassword: '',
    password: ''
  })
  const [newUserDetails, setNewUserDetails] = useState({
    name: '',
    profileImg: '',
    image: '',
    imageUrl: ''
  })
  const { isLoading } = useSelector(state => state.movies)
  const { reload } = useSelector((state) => state.auth)
  const [error, setError] = useState('')
  const [alert, setAlert] = useState('')
  const date = new Date(user.createdAt)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  const API_URL = process.env.REACT_APP_API_URL
  const img = API_URL + `/${user.profileImg}`
  const dispatch = useDispatch()

  useEffect(() => {
    const getUserDetails = async () => {
      dispatch(setReload(false))
      dispatch(setIsLoading(true))
      try {
        const { data } = await getUser()
        setUser(data.user)
        setNewUserDetails({
          name: data.user.name,
          profileImg: data.user.profileImg,
        })
        dispatch(setIsLoading(false))
      } catch (error) {
        console.log(error)
      }
    }
    getUserDetails()
  }, [dispatch, reload])

  const handleChange = (e) => {
    setNewUserDetails({...newUserDetails, [e.target.name]: e.target.value})
  }

  const handlePasswordChange = (e) => {
    setNewPassword({...newPassword, [e.target.name]: e.target.value})
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
        const { data } = await updatePassword(newPassword)
        setAlert(data.msg)
    } catch (error) {
        setError(error.response.data.error)
    } finally {
        setNewPassword({
          oldPassword: '',
          password: '',
        })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(setIsLoading(true))
    const formData = new FormData()
    formData.append('name', newUserDetails.name)
    formData.append('thumbnail', newUserDetails.image)
    try {
      await updateUserDetails(formData)
      dispatch(setIsLoading(false))
      setNewUserDetails({...newUserDetails, image: '', imageUrl: ''})
      dispatch(setReload(true))
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setNewUserDetails({
        ...newUserDetails, 
        imageUrl: reader.result,
        image: file
      })
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      {isLoading ? (
        <div className="moviedetails_loading">
          <Loading />
        </div>
      ) : (
        <section className="profile_container">
          <div className="profile_details">
            <h2>Account</h2>
            <div className="profile">
              <div className="profile_avatar">
                <Avatar
                  src={
                    newUserDetails.imageUrl
                      ? newUserDetails.imageUrl
                      : user.profileImg && img
                  }
                  sx={{
                    height: '150px',
                    width: '150px',
                  }}
                  className="avatar_pic"
                />
                <div className="avatar_upload_controls">
                  {newUserDetails.imageUrl ? (
                    <ClearIcon
                      onClick={() =>
                        setNewUserDetails({
                          ...newUserDetails,
                          imageUrl: '',
                          image: '',
                        })
                      }
                      sx={{ color: '#323232', fontSize: '1.25rem' }}
                    />
                  ) : (
                    <IconButton
                      aria-label="upload profile picture"
                      component="label"
                      sx={{
                        padding: '0',
                      }}
                    >
                      <PhotoCamera
                        sx={{ color: '#323232', fontSize: '1.25rem' }}
                      />
                      <input
                        type="file"
                        hidden
                        accept=".jpg, .jpeg, .png"
                        id="upload-image"
                        onChange={handleFileUpload}
                      />
                    </IconButton>
                  )}
                </div>
              </div>
              <div className="profile_user">
                <h4>{user.name}</h4>
                <p className="profile_email">{user.email}</p>
                <p className="profile_time">Joined {formattedDate}</p>
              </div>
            </div>
            <div className="profile_forms">
              <form
                className="profile_form"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <small>** update name and avatar</small>
                <div className="profile_group">
                  <label>Email</label>
                  <input type="text" defaultValue={user?.email} disabled />
                </div>
                <div className="profile_group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newUserDetails.name}
                    onChange={handleChange}
                  />
                </div>
                <button
                  disabled={
                    user.name === newUserDetails.name &&
                    !newUserDetails.imageUrl
                  }
                >
                  Update
                </button>
              </form>
              <form className="profile_form" onSubmit={handlePasswordSubmit}>
                <small>** update password</small>
                {alert && <p className="alert">{alert}</p>}
                <div className="profile_group">
                  <label htmlFor="old-password">Old Password</label>
                  <input
                    type="password"
                    id="old-password"
                    name="oldPassword"
                    onChange={handlePasswordChange}
                    value={newPassword.oldPassword}
                    required
                    placeholder="********"
                  />
                  {error && <p className="red">{error}</p>}
                </div>
                <div className="profile_group">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handlePasswordChange}
                    value={newPassword.password}
                    required
                    placeholder="********"
                  />
                </div>
                <button>Update</button>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Profile
