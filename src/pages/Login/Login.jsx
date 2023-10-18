import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Login.scss'
import { loginUser } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../../redux/slices/authSlice'

const Login = () => {
  const {loginInfo: user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { state } = useLocation()
  console.log(state)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(setLogin({...user, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await loginUser(user)
      localStorage.setItem('movieToken', res.data.token)
      navigate('/')
    } catch(error) {
      setError(error.response.data.error)
    } finally {
      dispatch(setLogin({ email: "", password: "" }))
    }
  }

  return (
    <section className="login_container">
      <h1>Movie Reel</h1>
      <form className="login_wrapper" onSubmit={handleSubmit}>
        {error && <p className="red">{error}</p>}
        {state?.message && <p className='alert'>{state?.message}</p>}
        <h3>Login</h3>
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
          <Link to="/register">New User?</Link>
        </div>
        <button>Submit</button>
      </form>
    </section>
  )
}

export default Login
