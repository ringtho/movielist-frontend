import React, { useEffect, useState } from 'react'
import './Profile.scss'
import { getUser, updatePassword } from '../../api'

const Profile = () => {
  const [user, setUser] = useState({})
  const [newPassword, setNewPassword] = useState({
    oldPassword: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [alert, setAlert] = useState('')
  const date = new Date(user.createdAt)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)

  useEffect(() => {

    const getUserDetails = async () => {
        try {
            const { data } = await getUser()
            setUser(data.user)
        } catch (error) {
            console.log(error)
        }
    }
    getUserDetails()
  }, [])

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
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
        // console.log(res)
    } catch (error) {
        setError(error.response.data.error)
    } finally {
        setNewPassword({
          oldPassword: '',
          password: '',
        })
    }
  }

  return (
    <section className="profile_container">
      <div className="profile_details">
        <h2>Account</h2>
        <div className="profile">
          <div className="profile_avatar"></div>
          <div className="profile_user">
            <h4>{user.name}</h4>
            <p className="profile_email">{user.email}</p>
            <p className="profile_time">Joined {formattedDate}</p>
          </div>
        </div>
        <div className="profile_forms">
          <form className="profile_form">
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
                onChange={() => handleChange()}
                value={user?.name}
              />
            </div>
            <button>Update</button>
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
  )
}

export default Profile
