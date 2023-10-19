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
  const [file, setFile] = useState("")
  const { movie } = useSelector((state) => state.movies)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    dispatch(addMovie({ ...movie, [e.target.name]: e.target.value }))
  }

  const handleImageChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('image', file)
    formData.append('title', movie.title)
    formData.append('plot', movie.plot)
    formData.append('genre', movie.genre)
    formData.append('releaseDate', movie.releaseDate)
    formData.append('rating', movie.rating)
    formData.append('notes', movie.notes)
    formData.append('favorited', movie.favorited)
    try {
        await createMovie(formData)
        dispatch(
          addMovie({
            title: '',
            genre: '',
            releaseDate: null,
            plot: '',
            rating: 0,
            notes: '',
            favorited: false,
            thumbnail: '',
          })
        )
        setFile('')
        setIsSubmitting(false)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <section className="addmovie_container">
      <div className="addmovie">
        <Back />
        <form
          className="addmovie_wrapper"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
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
            <DatePickerItem value={movie.releaseDate} />
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
                {movie.favorited ? 'favorite' : 'Not favorite'}
              </small>
            </div>
          </div>
          <div className="add_controls">
            <label id="thumbnail">Upload Thumbnail</label>
            <input
              id="thumbnail"
              name="thumbnail"
              type="file"
              // value={image}
              onChange={handleImageChange}
            />
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
