import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'
import { loginUser } from '../../api'

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState('')
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser({...user, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await loginUser(user)
      localStorage.setItem('movieToken', res.data.token)
    } catch(error) {
      setError(error.response.data.error)
    }
  }

  return (
    <section className="login_container">
      <h1>Movie Reel</h1>
      <form className="login_wrapper" onSubmit={handleSubmit}>
        {error && <p className="red">{error}</p>}
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
