import React, { useState } from 'react'
import './AddMovie.scss'
import { createMovie } from '../../api'
import Back from '../../components/Back/Back'
import { useNavigate } from 'react-router-dom'
import DatePickerItem from '../../components/DatePicker/DatePicker'
import { useDispatch, useSelector } from 'react-redux'
import { addMovie } from '../../redux/slices/moviesSlice'
import Rating from '@mui/material/Rating'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

const AddMovie = () => {
  const dispatch = useDispatch()
  const { movie } = useSelector((state) => state.movies)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    dispatch(addMovie({ ...movie, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
        await createMovie(movie)
        setIsSubmitting(false)
        dispatch(addMovie({}))
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  }

  console.log(movie)

  return (
    <section className="addmovie_container">
      <div className="addmovie">
        <Back />
        <form className="addmovie_wrapper" onSubmit={handleSubmit}>
          <h1>Add a new movie?</h1>
          <div className="add_controls">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={movie.title}
              onChange={handleChange}
              placeholder="eg Mr Smith and Mrs Smith"
              required
            />
          </div>
          <div className="add_controls">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={movie.genre}
              onChange={handleChange}
              placeholder="eg Action"
              required
            />
          </div>
          <div className="add_controls">
            <label htmlFor="plot">Plot</label>
            <textarea
              type="text"
              id="plot"
              name="plot"
              value={movie.plot}
              onChange={handleChange}
              placeholder="eg A secret service agent revenges the death of his wife"
              required
            />
          </div>
          <div className="add_controls">
            <label htmlFor="releaseDate">Release Date</label>
            <DatePickerItem />
          </div>
          <div className="add_controls">
            <label className="rating">Rating</label>
            <div className="rating_results">
              <Rating
                name="size-medium"
                sx={{
                  color: '#BB86Fc',
                  width: '32px',
                  height: '32px',
                }}
                size="large"
                value={movie.rating}
                onChange={(event, newValue) =>
                  dispatch(addMovie({ ...movie, rating: newValue }))
                }
                precision={0.5}
              />
              <p>{movie.rating}</p>
            </div>
          </div>
          <div className="add_controls">
            <label className="rating">Favorite</label>
            <div className="rating_results">
              {movie.favorited ? (
                <FavoriteIcon
                  className="favorite_filled"
                  sx={{
                    fontSize: '1.25rem',
                  }}
                  onClick={() => {
                    dispatch(
                      addMovie({ ...movie, favorited: !movie.favorited })
                    )
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  className="favorite_empty"
                  sx={{
                    fontSize: '1.25rem',
                  }}
                  onClick={() => {
                    dispatch(
                      addMovie({ ...movie, favorited: !movie.favorited })
                    )
                  }}
                />
              )}
              <small className={movie.favorited ? 'gold' : 'other'}>
                {movie.favorited ? 'favorite' : 'Not favorite' }
              </small>
            </div>
          </div>
          <div className="add_controls">
            <label id="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={movie.notes}
              onChange={handleChange}
            />
          </div>
          <button disabled={isSubmitting} className="btn">
            {isSubmitting ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AddMovie
