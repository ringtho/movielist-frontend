import React from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'

const Login = () => {
  return (
    <section className="login_container">
      <h1>Movie Reel</h1>
      <form className="login_wrapper">
        <h3>Login</h3>
        <div className="login_group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div className="login_group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="login_control">
          <Link to='/register'>New User?</Link>
        </div>
        <button>Submit</button>
      </form>
    </section>
  )
}

export default Login
