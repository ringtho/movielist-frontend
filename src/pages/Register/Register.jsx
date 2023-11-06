import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.scss'
import { registerUser } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { setRegister } from '../../redux/slices/authSlice'
import Logo from '../../assets/icons8-film-80.png'
import { useForm } from 'react-hook-form'

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

  const onSubmit = async (e) => {
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
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  return (
    <section className="login_container">
      <div className="login_cont">
        <div className="login_logo">
          <img src={Logo} alt="logo" />
          <h1>Movie Reel</h1>
        </div>
        <form className="login_wrapper" onSubmit={handleSubmit(onSubmit)}>
          {error && <p className="red">{error}</p>}
          <h3>Register</h3>
          <div className="login_group">
            <label htmlFor="name">Name</label>
            <input
              {...register('name', {
                required: 'Name is required'
              })}
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="eg John Doe"
            />
            {errors.name?.message && (
              <p className="errors">{errors.name.message}</p>
            )}
          </div>
          <div className="login_group">
            <label htmlFor="email">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                validate: {
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    'Please provide a valid email address'
                }
              })}
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="eg jdoe@email.com"
            />
            {errors.email?.message && (
              <p className="errors">{errors.email.message}</p>
            )}
          </div>
          <div className="login_group">
            <label htmlFor="password">Password</label>
            <input
              {...register('password', {
                required: 'Password is required'
              })}
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="********"
            />
            {errors.password?.message && (
              <p className="errors">{errors.password.message}</p>
            )}
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
