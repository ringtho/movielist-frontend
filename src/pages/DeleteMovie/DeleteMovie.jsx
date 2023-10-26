import React from 'react'
import './DeleteMovie.scss'
import { useSelector } from 'react-redux'
import { deleteMovie } from '../../api'
import { useNavigate } from 'react-router-dom'

const DeleteMovie = ({ setIsActive }) => {
  const { movie } = useSelector((state) => state.movies)
  const navigate = useNavigate()
  const handleCancelClick = async () => {
    setIsActive(false)
  }

  const handleDeleteClick = async () => {
    try {
      await deleteMovie(movie.id)
      navigate('/')
      setIsActive(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className="delete_container">
      <div className="delete_wrapper">
        <h1>Delete</h1>
        <p>
          Are you sure you want to delete this? This action cannot be reversed
        </p>
        <div className='delete_controls'>
          <button className="cancel_btn" onClick={handleCancelClick}>Cancel</button>
          <button className="delete_btn" onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
    </section>
  )
}

export default DeleteMovie
