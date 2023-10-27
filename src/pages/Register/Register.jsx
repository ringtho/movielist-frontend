import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.scss'
import { registerUser } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { setRegister } from '../../redux/slices/authSlice'
import Logo from '../../assets/icons8-film-80.png'

const Register = () => {
  const user = useSelector(state => state.auth.registerInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(setRegister({ ...user, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await registerUser(user)
      navigate('/login', {
        state: { message: 'Login to continue' },
        replace: true
      })
    } catch (error) {
      setError(error.response.data.error)
    } finally {
      dispatch(setRegister({ email: '', name: '', password: '' }))
    }
  }

  return (
    <section className="login_container">
      <div className="login_cont">
        <div className="login_logo">
          <img src={Logo} alt="logo" />
          <h1>Movie Reel</h1>
        </div>
        <form className="login_wrapper" onSubmit={handleSubmit}>
          {error && <p className="red">{error}</p>}
          <h3>Register</h3>
          <div className="login_group">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="eg John Doe"
              required
            />
          </div>
          <div className="login_group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="eg jdoe@email.com"
              required
            />
          </div>
          <div className="login_group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>
          <div className="login_control">
            <Link to="/login">Already a member?</Link>
          </div>
          <button>Register</button>
        </form>
      </div>
    </section>
  )
}

export default Register
