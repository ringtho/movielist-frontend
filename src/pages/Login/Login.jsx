import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Login.scss'
import { loginUser } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../../redux/slices/authSlice'
import Logo from '../../assets/icons8-film-80.png'
import { useForm } from 'react-hook-form'

const Login = () => {
  const { loginInfo: user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { state } = useLocation()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(setLogin({ ...user, [name]: value }))
  }

  const onSubmit = async (e) => {
    try {
      const res = await loginUser(user)
      localStorage.setItem('movieToken', res.data.token)
      navigate('/')
    } catch (error) {
      setError(error.response.data.error)
    } finally {
      dispatch(setLogin({ email: '', password: '' }))
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
          {state?.message && <p className="alert">{state?.message}</p>}
          <h3>Login</h3>
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
            {errors.email?.message && <p className="errors">{errors.email.message}</p>}
          </div>
          <div className="login_group">
            <label htmlFor="password">Password</label>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="********"
            />
            {errors.password?.type === 'required' && (
              <p className="errors">{errors.password.message}</p>
            )}
          </div>
          <div className="login_control">
            <Link to="/register">New User?</Link>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </section>
  )
}

export default Login
