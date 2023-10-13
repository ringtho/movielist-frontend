import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.scss'

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser({...user, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  console.log(user)
  return (
    <section className="login_container">
      <h1>Movie Reel</h1>
      <form className="login_wrapper" onSubmit={handleSubmit}>
        <h3>Register</h3>
        <div className="login_group">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder='eg John Doe'
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
            placeholder='eg jdoe@email.com'
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
            placeholder='********'
          />
        </div>
        <div className="login_control">
          <Link to="/login">Already a member?</Link>
        </div>
        <button>Register</button>
      </form>
    </section>
  )
}

export default Register
